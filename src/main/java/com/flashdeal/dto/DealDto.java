package com.flashdeal.dto;

import com.flashdeal.entity.Deal;
import com.flashdeal.entity.Deal.DealStatus;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class DealDto {
    
    private UUID id;
    private String hotelName;
    private String description;
    private BigDecimal originalPrice;
    private BigDecimal discountedPrice;
    private Integer discountPercentage;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer totalRooms;
    private Integer remainingRooms;
    private String location;
    private String imageUrl;
    private Integer trustScore;
    private DealStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Computed fields
    private boolean active;
    private boolean upcoming;
    private boolean expired;
    private long timeRemaining; // in seconds
    private long timeUntilStart; // in seconds
    
    // Constructors
    public DealDto() {}
    
    public DealDto(Deal deal) {
        this.id = deal.getId();
        this.hotelName = deal.getHotelName();
        this.description = deal.getDescription();
        this.originalPrice = deal.getOriginalPrice();
        this.discountedPrice = deal.getDiscountedPrice();
        this.discountPercentage = deal.getDiscountPercentage();
        this.startTime = deal.getStartTime();
        this.endTime = deal.getEndTime();
        this.totalRooms = deal.getTotalRooms();
        this.remainingRooms = deal.getRemainingRooms();
        this.location = deal.getLocation();
        this.imageUrl = deal.getImageUrl();
        this.trustScore = deal.getTrustScore();
        this.status = deal.getStatus();
        this.createdAt = deal.getCreatedAt();
        this.updatedAt = deal.getUpdatedAt();
        
        // Compute derived fields
        this.active = deal.isActive();
        this.upcoming = deal.isUpcoming();
        this.expired = deal.isExpired();
        
        LocalDateTime now = LocalDateTime.now();
        if (deal.isActive()) {
            this.timeRemaining = java.time.Duration.between(now, deal.getEndTime()).getSeconds();
        } else if (deal.isUpcoming()) {
            this.timeUntilStart = java.time.Duration.between(now, deal.getStartTime()).getSeconds();
        }
    }
    
    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
    
    public BigDecimal getDiscountedPrice() { return discountedPrice; }
    public void setDiscountedPrice(BigDecimal discountedPrice) { this.discountedPrice = discountedPrice; }
    
    public Integer getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(Integer discountPercentage) { this.discountPercentage = discountPercentage; }
    
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    
    public Integer getTotalRooms() { return totalRooms; }
    public void setTotalRooms(Integer totalRooms) { this.totalRooms = totalRooms; }
    
    public Integer getRemainingRooms() { return remainingRooms; }
    public void setRemainingRooms(Integer remainingRooms) { this.remainingRooms = remainingRooms; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Integer getTrustScore() { return trustScore; }
    public void setTrustScore(Integer trustScore) { this.trustScore = trustScore; }
    
    public DealStatus getStatus() { return status; }
    public void setStatus(DealStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    
    public boolean isUpcoming() { return upcoming; }
    public void setUpcoming(boolean upcoming) { this.upcoming = upcoming; }
    
    public boolean isExpired() { return expired; }
    public void setExpired(boolean expired) { this.expired = expired; }
    
    public long getTimeRemaining() { return timeRemaining; }
    public void setTimeRemaining(long timeRemaining) { this.timeRemaining = timeRemaining; }
    
    public long getTimeUntilStart() { return timeUntilStart; }
    public void setTimeUntilStart(long timeUntilStart) { this.timeUntilStart = timeUntilStart; }
}
