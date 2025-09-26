package com.flashdeal.repository;

import com.flashdeal.entity.Booking;
import com.flashdeal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    
    List<Booking> findByUserOrderByBookedAtDesc(User user);
    
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId ORDER BY b.bookedAt DESC")
    List<Booking> findByUserIdOrderByBookedAtDesc(@Param("userId") UUID userId);
}
