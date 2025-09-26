package com.flashdeal.service;

import com.flashdeal.dto.BookingRequest;
import com.flashdeal.entity.Booking;
import com.flashdeal.entity.Deal;
import com.flashdeal.entity.User;
import com.flashdeal.repository.BookingRepository;
import com.flashdeal.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
        return createBooking(request, null);
    }
    
    public Booking createBooking(BookingRequest request, User user) {
        // 딜 존재 및 예약 가능 여부 확인
        Deal deal = dealRepository.findAvailableDealById(request.getDealId());
        if (deal == null) {
            throw new IllegalArgumentException("예약할 수 없는 딜입니다.");
        }
        
        if (deal.getRemainingRooms() <= 0) {
            throw new IllegalArgumentException("남은 객실이 없습니다.");
        }
        
        // 원자적 트랜잭션으로 예약 생성 및 남은 객실 수 감소
        Booking booking;
        if (user != null) {
            booking = new Booking(deal, user, request.getUserName(), request.getContact());
        } else {
            booking = new Booking(deal, request.getUserName(), request.getContact());
        }
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
    
    public List<Booking> getUserBookings(UUID userId) {
        return bookingRepository.findByUserIdOrderByBookedAtDesc(userId);
    }
    
    public boolean cancelBooking(UUID bookingId, UUID userId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null) {
            return false;
        }
        
        // 사용자 권한 확인
        if (booking.getUser() == null || !booking.getUser().getId().equals(userId)) {
            return false;
        }
        
        // 예약 취소 가능 여부 확인
        if (!"CONFIRMED".equals(booking.getStatus())) {
            return false;
        }
        
        // 예약 취소 처리
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
        
        // 딜의 남은 객실 수 증가
        Deal deal = booking.getDeal();
        deal.setRemainingRooms(deal.getRemainingRooms() + 1);
        dealRepository.save(deal);
        
        // WebSocket으로 업데이트 알림
        dealService.updateDealRemainingRooms(deal.getId(), deal.getRemainingRooms());
        
        return true;
    }
}
