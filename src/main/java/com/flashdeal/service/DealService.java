package com.flashdeal.service;

import com.flashdeal.dto.CreateDealRequest;
import com.flashdeal.dto.DealDto;
import com.flashdeal.entity.Deal;
import com.flashdeal.entity.Deal.DealStatus;
import com.flashdeal.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class DealService {
    
    @Autowired
    private DealRepository dealRepository;
    
    public List<DealDto> getActiveDeals() {
        List<Deal> deals = dealRepository.findActiveDeals(LocalDateTime.now());
        return deals.stream()
                .map(DealDto::new)
                .collect(Collectors.toList());
    }
    
    public List<DealDto> getUpcomingDeals() {
        List<Deal> deals = dealRepository.findUpcomingDeals(LocalDateTime.now());
        return deals.stream()
                .map(DealDto::new)
                .collect(Collectors.toList());
    }
    
    public Page<DealDto> getActiveDealsWithPagination(Pageable pageable) {
        Page<Deal> deals = dealRepository.findActiveDealsWithPagination(LocalDateTime.now(), pageable);
        return deals.map(DealDto::new);
    }
    
    public Optional<DealDto> getDealById(UUID id) {
        return dealRepository.findById(id)
                .map(DealDto::new);
    }
    
    public List<DealDto> searchDeals(String query) {
        List<Deal> deals = dealRepository.findByHotelNameContainingIgnoreCase(query);
        deals.addAll(dealRepository.findByLocationContainingIgnoreCase(query));
        return deals.stream()
                .map(DealDto::new)
                .collect(Collectors.toList());
    }
    
    public List<DealDto> getDealsByPriceRange(Double minPrice, Double maxPrice) {
        List<Deal> deals = dealRepository.findByPriceRange(minPrice, maxPrice);
        return deals.stream()
                .map(DealDto::new)
                .collect(Collectors.toList());
    }
    
    public List<DealDto> getDealsByMinDiscount(Integer minDiscount) {
        List<Deal> deals = dealRepository.findByMinDiscount(minDiscount);
        return deals.stream()
                .map(DealDto::new)
                .collect(Collectors.toList());
    }
    
    public List<DealDto> getDealsEndingSoon(int hours) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endTime = now.plusHours(hours);
        List<Deal> deals = dealRepository.findDealsEndingSoon(now, endTime);
        return deals.stream()
                .map(DealDto::new)
                .collect(Collectors.toList());
    }
    
    public DealDto createDeal(CreateDealRequest request) {
        if (!request.isValidTimeRange()) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        
        if (!request.isValidPriceRange()) {
            throw new IllegalArgumentException("Discounted price must be less than original price");
        }
        
        Deal deal = new Deal();
        deal.setHotelName(request.getHotelName());
        deal.setDescription(request.getDescription());
        deal.setOriginalPrice(request.getOriginalPrice());
        deal.setDiscountedPrice(request.getDiscountedPrice());
        deal.setDiscountPercentage(request.getDiscountPercentage());
        deal.setStartTime(request.getStartTime());
        deal.setEndTime(request.getEndTime());
        deal.setTotalRooms(request.getTotalRooms());
        deal.setRemainingRooms(request.getTotalRooms());
        deal.setLocation(request.getLocation());
        deal.setImageUrl(request.getImageUrl());
        deal.setTrustScore(request.getTrustScore());
        
        // Set initial status based on start time
        if (request.getStartTime().isAfter(LocalDateTime.now())) {
            deal.setStatus(DealStatus.UPCOMING);
        } else {
            deal.setStatus(DealStatus.ACTIVE);
        }
        
        Deal savedDeal = dealRepository.save(deal);
        return new DealDto(savedDeal);
    }
    
    public DealDto updateDeal(UUID id, CreateDealRequest request) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));
        
        if (!request.isValidTimeRange()) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        
        if (!request.isValidPriceRange()) {
            throw new IllegalArgumentException("Discounted price must be less than original price");
        }
        
        deal.setHotelName(request.getHotelName());
        deal.setDescription(request.getDescription());
        deal.setOriginalPrice(request.getOriginalPrice());
        deal.setDiscountedPrice(request.getDiscountedPrice());
        deal.setDiscountPercentage(request.getDiscountPercentage());
        deal.setStartTime(request.getStartTime());
        deal.setEndTime(request.getEndTime());
        deal.setTotalRooms(request.getTotalRooms());
        deal.setLocation(request.getLocation());
        deal.setImageUrl(request.getImageUrl());
        deal.setTrustScore(request.getTrustScore());
        
        Deal savedDeal = dealRepository.save(deal);
        return new DealDto(savedDeal);
    }
    
    public void deleteDeal(UUID id) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));
        
        deal.setStatus(DealStatus.CANCELLED);
        dealRepository.save(deal);
    }
    
    public void bookRoom(UUID dealId) {
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));
        
        if (!deal.isActive()) {
            throw new IllegalStateException("Deal is not active");
        }
        
        if (deal.getRemainingRooms() <= 0) {
            throw new IllegalStateException("No rooms available");
        }
        
        deal.bookRoom();
        dealRepository.save(deal);
    }
    
    public void cancelBooking(UUID dealId) {
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));
        
        deal.cancelBooking();
        dealRepository.save(deal);
    }
    
    @Scheduled(fixedRate = 60000) // Run every minute
    public void updateDealStatuses() {
        List<Deal> dealsToUpdate = dealRepository.findDealsNeedingStatusUpdate(LocalDateTime.now());
        
        for (Deal deal : dealsToUpdate) {
            if (deal.getStatus() == DealStatus.UPCOMING && deal.getStartTime().isBefore(LocalDateTime.now())) {
                deal.setStatus(DealStatus.ACTIVE);
            } else if (deal.getStatus() == DealStatus.ACTIVE && deal.getEndTime().isBefore(LocalDateTime.now())) {
                deal.setStatus(DealStatus.EXPIRED);
            }
            dealRepository.save(deal);
        }
    }
    
    public long getActiveDealsCount() {
        return dealRepository.countActiveDeals(LocalDateTime.now());
    }
}
