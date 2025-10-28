package com.flashdeal.repository;

import com.flashdeal.entity.Deal;
import com.flashdeal.entity.Deal.DealStatus;
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
public interface DealRepository extends JpaRepository<Deal, UUID> {
    
    // Find active deals
    @Query("SELECT d FROM Deal d WHERE d.status = 'ACTIVE' AND d.startTime <= :now AND d.endTime > :now AND d.remainingRooms > 0 ORDER BY d.startTime ASC")
    List<Deal> findActiveDeals(@Param("now") LocalDateTime now);
    
    // Find upcoming deals
    @Query("SELECT d FROM Deal d WHERE d.status = 'UPCOMING' AND d.startTime > :now ORDER BY d.startTime ASC")
    List<Deal> findUpcomingDeals(@Param("now") LocalDateTime now);
    
    // Find deals by status
    List<Deal> findByStatus(DealStatus status);
    
    // Find deals by location
    @Query("SELECT d FROM Deal d WHERE LOWER(d.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<Deal> findByLocationContainingIgnoreCase(@Param("location") String location);
    
    // Find deals by hotel name
    @Query("SELECT d FROM Deal d WHERE LOWER(d.hotelName) LIKE LOWER(CONCAT('%', :hotelName, '%'))")
    List<Deal> findByHotelNameContainingIgnoreCase(@Param("hotelName") String hotelName);
    
    // Find deals with pagination
    @Query("SELECT d FROM Deal d WHERE d.status = 'ACTIVE' AND d.startTime <= :now AND d.endTime > :now AND d.remainingRooms > 0")
    Page<Deal> findActiveDealsWithPagination(@Param("now") LocalDateTime now, Pageable pageable);
    
    // Find deals ending soon
    @Query("SELECT d FROM Deal d WHERE d.status = 'ACTIVE' AND d.endTime BETWEEN :now AND :endTime ORDER BY d.endTime ASC")
    List<Deal> findDealsEndingSoon(@Param("now") LocalDateTime now, @Param("endTime") LocalDateTime endTime);
    
    // Find deals by price range
    @Query("SELECT d FROM Deal d WHERE d.status = 'ACTIVE' AND d.discountedPrice BETWEEN :minPrice AND :maxPrice ORDER BY d.discountedPrice ASC")
    List<Deal> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);
    
    // Find deals by discount percentage
    @Query("SELECT d FROM Deal d WHERE d.status = 'ACTIVE' AND d.discountPercentage >= :minDiscount ORDER BY d.discountPercentage DESC")
    List<Deal> findByMinDiscount(@Param("minDiscount") Integer minDiscount);
    
    // Count active deals
    @Query("SELECT COUNT(d) FROM Deal d WHERE d.status = 'ACTIVE' AND d.startTime <= :now AND d.endTime > :now AND d.remainingRooms > 0")
    Long countActiveDeals(@Param("now") LocalDateTime now);
    
    // Find deals that need status update
    @Query("SELECT d FROM Deal d WHERE (d.status = 'UPCOMING' AND d.startTime <= :now) OR (d.status = 'ACTIVE' AND d.endTime <= :now)")
    List<Deal> findDealsNeedingStatusUpdate(@Param("now") LocalDateTime now);
    
    // Country-related queries
    @Query("SELECT DISTINCT d.country FROM Deal d ORDER BY d.country ASC")
    List<String> findDistinctCountries();
    
    @Query("SELECT d FROM Deal d WHERE LOWER(d.country) = LOWER(:country) ORDER BY d.startTime ASC")
    List<Deal> findByCountryIgnoreCase(@Param("country") String country);
    
    @Query("SELECT DISTINCT d.city FROM Deal d WHERE LOWER(d.country) = LOWER(:country) ORDER BY d.city ASC")
    List<String> findDistinctCitiesByCountry(@Param("country") String country);
    
    @Query("SELECT d FROM Deal d WHERE LOWER(d.country) = LOWER(:country) AND LOWER(d.city) = LOWER(:city) ORDER BY d.startTime ASC")
    List<Deal> findByCountryAndCityIgnoreCase(@Param("country") String country, @Param("city") String city);
}
