package com.flashdeal.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class DealDto {
    private UUID id;
    private String hotelName;
    private BigDecimal originalPrice;
    private BigDecimal discountedPrice;
    private Integer discountPct;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer remainingRooms;
    private BigDecimal trust;
    private boolean active;
    private long timeRemaining; // seconds
    
    // Constructors
    public DealDto() {}
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getHotelName() {
        return hotelName;
    }
    
    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }
    
    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }
    
    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }
    
    public BigDecimal getDiscountedPrice() {
        return discountedPrice;
    }
    
    public void setDiscountedPrice(BigDecimal discountedPrice) {
        this.discountedPrice = discountedPrice;
    }
    
    public Integer getDiscountPct() {
        return discountPct;
    }
    
    public void setDiscountPct(Integer discountPct) {
        this.discountPct = discountPct;
    }
    
    public LocalDateTime getStartTime() {
        return startTime;
    }
    
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
    
    public LocalDateTime getEndTime() {
        return endTime;
    }
    
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
    
    public Integer getRemainingRooms() {
        return remainingRooms;
    }
    
    public void setRemainingRooms(Integer remainingRooms) {
        this.remainingRooms = remainingRooms;
    }
    
    public BigDecimal getTrust() {
        return trust;
    }
    
    public void setTrust(BigDecimal trust) {
        this.trust = trust;
    }
    
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
    
    public long getTimeRemaining() {
        return timeRemaining;
    }
    
    public void setTimeRemaining(long timeRemaining) {
        this.timeRemaining = timeRemaining;
    }
}
