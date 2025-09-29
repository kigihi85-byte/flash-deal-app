package com.flashdeal.service;

import com.flashdeal.dto.CreateReviewRequest;
import com.flashdeal.dto.ReviewDto;
import com.flashdeal.entity.Deal;
import com.flashdeal.entity.Review;
import com.flashdeal.entity.User;
import com.flashdeal.repository.DealRepository;
import com.flashdeal.repository.ReviewRepository;
import com.flashdeal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private DealRepository dealRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<ReviewDto> getReviewsByDealId(UUID dealId) {
        List<Review> reviews = reviewRepository.findByDealIdOrderByCreatedAtDesc(dealId);
        return reviews.stream()
                .map(ReviewDto::new)
                .collect(Collectors.toList());
    }
    
    public Page<ReviewDto> getReviewsByDealIdWithPagination(UUID dealId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Review> reviews = reviewRepository.findByDealIdOrderByCreatedAtDesc(dealId, pageable);
        return reviews.map(ReviewDto::new);
    }
    
    public List<ReviewDto> getReviewsByUserId(UUID userId) {
        List<Review> reviews = reviewRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return reviews.stream()
                .map(ReviewDto::new)
                .collect(Collectors.toList());
    }
    
    public ReviewDto createReview(UUID userId, CreateReviewRequest request) {
        // Check if deal exists
        Deal deal = dealRepository.findById(request.getDealId())
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));
        
        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        // Check if user already reviewed this deal
        Optional<Review> existingReview = reviewRepository.findByDealIdAndUserId(request.getDealId(), userId);
        if (existingReview.isPresent()) {
            throw new IllegalStateException("User has already reviewed this deal");
        }
        
        // Create new review
        Review review = new Review(deal, user, request.getRating(), request.getComment());
        Review savedReview = reviewRepository.save(review);
        
        return new ReviewDto(savedReview);
    }
    
    public ReviewDto updateReview(UUID userId, UUID reviewId, CreateReviewRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        
        // Check if user owns the review
        if (!review.getUser().getId().equals(userId)) {
            throw new IllegalStateException("User can only update their own reviews");
        }
        
        // Update review
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        Review savedReview = reviewRepository.save(review);
        
        return new ReviewDto(savedReview);
    }
    
    public void deleteReview(UUID userId, UUID reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        
        // Check if user owns the review
        if (!review.getUser().getId().equals(userId)) {
            throw new IllegalStateException("User can only delete their own reviews");
        }
        
        reviewRepository.delete(review);
    }
    
    public void markReviewAsHelpful(UUID reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        
        review.setHelpfulCount(review.getHelpfulCount() + 1);
        reviewRepository.save(review);
    }
    
    public Double getAverageRatingByDealId(UUID dealId) {
        Double averageRating = reviewRepository.getAverageRatingByDealId(dealId);
        return averageRating != null ? Math.round(averageRating * 10.0) / 10.0 : 0.0;
    }
    
    public Long getReviewCountByDealId(UUID dealId) {
        return reviewRepository.countByDealId(dealId);
    }
    
    public List<ReviewDto> getVerifiedReviewsByDealId(UUID dealId) {
        List<Review> reviews = reviewRepository.findVerifiedReviewsByDealId(dealId);
        return reviews.stream()
                .map(ReviewDto::new)
                .collect(Collectors.toList());
    }
    
    public List<ReviewDto> getReviewsByRatingRange(UUID dealId, Integer minRating, Integer maxRating) {
        List<Review> reviews = reviewRepository.findByDealIdAndRatingBetween(dealId, minRating, maxRating);
        return reviews.stream()
                .map(ReviewDto::new)
                .collect(Collectors.toList());
    }
    
    public void verifyReview(UUID reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        
        review.setIsVerified(true);
        reviewRepository.save(review);
    }
}

