package com.flashdeal.dto;

import com.flashdeal.entity.Review;
import com.flashdeal.entity.User;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReviewDto {
    
    private UUID id;
    private UUID dealId;
    private String userName;
    private String userEmail;
    private Integer rating;
    private String comment;
    private Boolean isVerified;
    private Integer helpfulCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public ReviewDto() {}
    
    public ReviewDto(Review review) {
        this.id = review.getId();
        this.dealId = review.getDeal().getId();
        this.userName = review.getUser().getFullName();
        this.userEmail = review.getUser().getEmail();
        this.rating = review.getRating();
        this.comment = review.getComment();
        this.isVerified = review.getIsVerified();
        this.helpfulCount = review.getHelpfulCount();
        this.createdAt = review.getCreatedAt();
        this.updatedAt = review.getUpdatedAt();
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public UUID getDealId() {
        return dealId;
    }
    
    public void setDealId(UUID dealId) {
        this.dealId = dealId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getUserEmail() {
        return userEmail;
    }
    
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }
    
    public Boolean getIsVerified() {
        return isVerified;
    }
    
    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
    
    public Integer getHelpfulCount() {
        return helpfulCount;
    }
    
    public void setHelpfulCount(Integer helpfulCount) {
        this.helpfulCount = helpfulCount;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

