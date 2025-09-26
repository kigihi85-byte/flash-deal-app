package com.flashdeal.repository;

import com.flashdeal.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface DealRepository extends JpaRepository<Deal, UUID> {
    
    @Query("SELECT d FROM Deal d WHERE d.startTime <= :now AND d.endTime > :now AND d.remainingRooms > 0 ORDER BY d.startTime ASC")
    List<Deal> findActiveDeals(@Param("now") LocalDateTime now);
    
    @Query("SELECT d FROM Deal d WHERE d.remainingRooms > 0 ORDER BY d.startTime ASC")
    List<Deal> findAvailableDeals();
    
    @Query("SELECT d FROM Deal d WHERE d.id = :id AND d.remainingRooms > 0")
    Deal findAvailableDealById(@Param("id") UUID id);
}
