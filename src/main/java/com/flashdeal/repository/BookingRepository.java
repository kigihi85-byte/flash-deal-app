package com.flashdeal.repository;

import com.flashdeal.entity.Booking;
import com.flashdeal.entity.Booking.BookingStatus;
import com.flashdeal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    
    List<Booking> findByUser(User user);
    
    Page<Booking> findByUser(User user, Pageable pageable);
    
    List<Booking> findByUserAndStatus(User user, BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.user = :user AND b.status = 'CONFIRMED' ORDER BY b.bookingTime DESC")
    List<Booking> findConfirmedBookingsByUser(@Param("user") User user);
    
    @Query("SELECT b FROM Booking b WHERE b.deal.id = :dealId")
    List<Booking> findByDealId(@Param("dealId") UUID dealId);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.deal.id = :dealId AND b.status = 'CONFIRMED'")
    Long countConfirmedBookingsByDealId(@Param("dealId") UUID dealId);
    
    @Query("SELECT b FROM Booking b WHERE b.bookingTime BETWEEN :startTime AND :endTime")
    List<Booking> findByBookingTimeBetween(@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);
    
    @Query("SELECT b FROM Booking b WHERE b.status = :status AND b.bookingTime < :cutoffTime")
    List<Booking> findExpiredBookings(@Param("status") BookingStatus status, @Param("cutoffTime") LocalDateTime cutoffTime);
}
