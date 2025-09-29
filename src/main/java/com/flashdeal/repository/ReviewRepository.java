package com.flashdeal.repository;

import com.flashdeal.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
    
    // Find reviews by deal ID
    @Query("SELECT r FROM Review r WHERE r.deal.id = :dealId ORDER BY r.createdAt DESC")
    List<Review> findByDealIdOrderByCreatedAtDesc(@Param("dealId") UUID dealId);
    
    // Find reviews by deal ID with pagination
    @Query("SELECT r FROM Review r WHERE r.deal.id = :dealId ORDER BY r.createdAt DESC")
    Page<Review> findByDealIdOrderByCreatedAtDesc(@Param("dealId") UUID dealId, Pageable pageable);
    
    // Find reviews by user ID
    @Query("SELECT r FROM Review r WHERE r.user.id = :userId ORDER BY r.createdAt DESC")
    List<Review> findByUserIdOrderByCreatedAtDesc(@Param("userId") UUID userId);
    
    // Find reviews by deal and user (to check if user already reviewed)
    @Query("SELECT r FROM Review r WHERE r.deal.id = :dealId AND r.user.id = :userId")
    Optional<Review> findByDealIdAndUserId(@Param("dealId") UUID dealId, @Param("userId") UUID userId);
    
    // Calculate average rating for a deal
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.deal.id = :dealId")
    Double getAverageRatingByDealId(@Param("dealId") UUID dealId);
    
    // Count reviews for a deal
    @Query("SELECT COUNT(r) FROM Review r WHERE r.deal.id = :dealId")
    Long countByDealId(@Param("dealId") UUID dealId);
    
    // Find verified reviews only
    @Query("SELECT r FROM Review r WHERE r.deal.id = :dealId AND r.isVerified = true ORDER BY r.createdAt DESC")
    List<Review> findVerifiedReviewsByDealId(@Param("dealId") UUID dealId);
    
    // Find reviews by rating range
    @Query("SELECT r FROM Review r WHERE r.deal.id = :dealId AND r.rating BETWEEN :minRating AND :maxRating ORDER BY r.createdAt DESC")
    List<Review> findByDealIdAndRatingBetween(@Param("dealId") UUID dealId, @Param("minRating") Integer minRating, @Param("maxRating") Integer maxRating);
}

