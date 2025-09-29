package com.flashdeal.controller;

import com.flashdeal.dto.CreateReviewRequest;
import com.flashdeal.dto.ReviewDto;
import com.flashdeal.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @GetMapping("/deal/{dealId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByDealId(@PathVariable UUID dealId) {
        List<ReviewDto> reviews = reviewService.getReviewsByDealId(dealId);
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/deal/{dealId}/paginated")
    public ResponseEntity<Page<ReviewDto>> getReviewsByDealIdWithPagination(
            @PathVariable UUID dealId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ReviewDto> reviews = reviewService.getReviewsByDealIdWithPagination(dealId, page, size);
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByUserId(@PathVariable UUID userId) {
        List<ReviewDto> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }
    
    @PostMapping
    public ResponseEntity<ReviewDto> createReview(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody CreateReviewRequest request) {
        try {
            ReviewDto review = reviewService.createReview(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewDto> updateReview(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID reviewId,
            @Valid @RequestBody CreateReviewRequest request) {
        try {
            ReviewDto review = reviewService.updateReview(userId, reviewId, request);
            return ResponseEntity.ok(review);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID reviewId) {
        try {
            reviewService.deleteReview(userId, reviewId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{reviewId}/helpful")
    public ResponseEntity<Void> markReviewAsHelpful(@PathVariable UUID reviewId) {
        try {
            reviewService.markReviewAsHelpful(reviewId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/deal/{dealId}/stats")
    public ResponseEntity<Object> getReviewStats(@PathVariable UUID dealId) {
        Double averageRating = reviewService.getAverageRatingByDealId(dealId);
        Long reviewCount = reviewService.getReviewCountByDealId(dealId);
        
        return ResponseEntity.ok(new Object() {
            public final Double avgRating = averageRating;
            public final Long count = reviewCount;
        });
    }
    
    @GetMapping("/deal/{dealId}/verified")
    public ResponseEntity<List<ReviewDto>> getVerifiedReviewsByDealId(@PathVariable UUID dealId) {
        List<ReviewDto> reviews = reviewService.getVerifiedReviewsByDealId(dealId);
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/deal/{dealId}/rating/{minRating}-{maxRating}")
    public ResponseEntity<List<ReviewDto>> getReviewsByRatingRange(
            @PathVariable UUID dealId,
            @PathVariable Integer minRating,
            @PathVariable Integer maxRating) {
        List<ReviewDto> reviews = reviewService.getReviewsByRatingRange(dealId, minRating, maxRating);
        return ResponseEntity.ok(reviews);
    }
    
    @PostMapping("/{reviewId}/verify")
    public ResponseEntity<Void> verifyReview(@PathVariable UUID reviewId) {
        try {
            reviewService.verifyReview(reviewId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

