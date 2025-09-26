package com.flashdeal.service;

import com.flashdeal.dto.BookingRequest;
import com.flashdeal.entity.Booking;
import com.flashdeal.entity.Deal;
import com.flashdeal.repository.BookingRepository;
import com.flashdeal.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private DealRepository dealRepository;
    
    @Autowired
    private DealService dealService;
    
    public Booking createBooking(BookingRequest request) {
        // 딜 존재 및 예약 가능 여부 확인
        Deal deal = dealRepository.findAvailableDealById(request.getDealId());
        if (deal == null) {
            throw new IllegalArgumentException("예약할 수 없는 딜입니다.");
        }
        
        if (deal.getRemainingRooms() <= 0) {
            throw new IllegalArgumentException("남은 객실이 없습니다.");
        }
        
        // 원자적 트랜잭션으로 예약 생성 및 남은 객실 수 감소
        Booking booking = new Booking(deal, request.getUserName(), request.getContact());
        Booking savedBooking = bookingRepository.save(booking);
        
        // 남은 객실 수 감소
        deal.decreaseRemainingRooms();
        dealRepository.save(deal);
        
        // WebSocket으로 업데이트 알림
        dealService.updateDealRemainingRooms(deal.getId(), deal.getRemainingRooms());
        
        return savedBooking;
    }
    
    public Booking getBookingById(UUID id) {
        return bookingRepository.findById(id).orElse(null);
    }
}
