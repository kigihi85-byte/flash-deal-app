package com.flashdeal.service;

import com.flashdeal.dto.DealDto;
import com.flashdeal.dto.SimulateDealRequest;
import com.flashdeal.entity.Deal;
import com.flashdeal.entity.Event;
import com.flashdeal.repository.DealRepository;
import com.flashdeal.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class DealService {
    
    @Autowired
    private DealRepository dealRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    public List<DealDto> getActiveDeals() {
        LocalDateTime now = LocalDateTime.now();
        List<Deal> deals = dealRepository.findActiveDeals(now);
        return deals.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<DealDto> getAllDeals() {
        List<Deal> deals = dealRepository.findAvailableDeals();
        return deals.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public DealDto getDealById(UUID id) {
        Deal deal = dealRepository.findAvailableDealById(id);
        if (deal == null) {
            return null;
        }
        return convertToDto(deal);
    }
    
    public DealDto createDeal(SimulateDealRequest request) {
        Deal deal = new Deal(
                request.getHotelName(),
                request.getOriginalPrice(),
                request.getDiscountedPrice(),
                request.getDiscountPct(),
                request.getStartTime(),
                request.getEndTime(),
                request.getRemainingRooms(),
                request.getTrust()
        );
        
        Deal savedDeal = dealRepository.save(deal);
        
        // 이벤트 기록
        Event event = new Event("new_deal", 
                String.format("{\"id\":\"%s\",\"hotelName\":\"%s\",\"discountPct\":%d}", 
                        savedDeal.getId(), savedDeal.getHotelName(), savedDeal.getDiscountPct()));
        eventRepository.save(event);
        
        // WebSocket으로 새 딜 알림
        DealDto dealDto = convertToDto(savedDeal);
        messagingTemplate.convertAndSend("/topic/deals", 
                String.format("{\"type\":\"new_deal\",\"seq\":%d,\"payload\":%s}", 
                        event.getSeq(), dealDtoToJson(dealDto)));
        
        return dealDto;
    }
    
    public void updateDealRemainingRooms(UUID dealId, int newRemainingRooms) {
        Deal deal = dealRepository.findById(dealId).orElse(null);
        if (deal != null) {
            deal.setRemainingRooms(newRemainingRooms);
            dealRepository.save(deal);
            
            // 이벤트 기록
            Event event = new Event("update_deal", 
                    String.format("{\"id\":\"%s\",\"remainingRooms\":%d}", dealId, newRemainingRooms));
            eventRepository.save(event);
            
            // WebSocket으로 업데이트 알림
            messagingTemplate.convertAndSend("/topic/deals", 
                    String.format("{\"type\":\"update_deal\",\"seq\":%d,\"payload\":{\"id\":\"%s\",\"remainingRooms\":%d}}", 
                            event.getSeq(), dealId, newRemainingRooms));
        }
    }
    
    private DealDto convertToDto(Deal deal) {
        DealDto dto = new DealDto();
        dto.setId(deal.getId());
        dto.setHotelName(deal.getHotelName());
        dto.setOriginalPrice(deal.getOriginalPrice());
        dto.setDiscountedPrice(deal.getDiscountedPrice());
        dto.setDiscountPct(deal.getDiscountPct());
        dto.setStartTime(deal.getStartTime());
        dto.setEndTime(deal.getEndTime());
        dto.setRemainingRooms(deal.getRemainingRooms());
        dto.setTrust(deal.getTrust());
        dto.setActive(deal.isActive());
        
        // 남은 시간 계산
        LocalDateTime now = LocalDateTime.now();
        if (deal.getEndTime().isAfter(now)) {
            dto.setTimeRemaining(ChronoUnit.SECONDS.between(now, deal.getEndTime()));
        } else {
            dto.setTimeRemaining(0);
        }
        
        return dto;
    }
    
    private String dealDtoToJson(DealDto dto) {
        return String.format("{\"id\":\"%s\",\"hotelName\":\"%s\",\"originalPrice\":%s,\"discountedPrice\":%s,\"discountPct\":%d,\"startTime\":\"%s\",\"endTime\":\"%s\",\"remainingRooms\":%d,\"trust\":%s,\"active\":%b,\"timeRemaining\":%d}",
                dto.getId(), dto.getHotelName(), 
                dto.getOriginalPrice() != null ? dto.getOriginalPrice().toString() : "0", 
                dto.getDiscountedPrice() != null ? dto.getDiscountedPrice().toString() : "0", 
                dto.getDiscountPct(), dto.getStartTime(), dto.getEndTime(), dto.getRemainingRooms(), 
                dto.getTrust() != null ? dto.getTrust().toString() : "0", dto.isActive(), dto.getTimeRemaining());
    }
}
