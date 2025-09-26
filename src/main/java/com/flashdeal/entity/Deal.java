package com.flashdeal.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "deals")
public class Deal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid")
    private UUID id;
    
    @Column(name = "hotel_name", nullable = false)
    private String hotelName;
    
    @Column(name = "original_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal originalPrice;
    
    @Column(name = "discounted_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal discountedPrice;
    
    @Column(name = "discount_pct", nullable = false)
    private Integer discountPct;
    
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;
    
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;
    
    @Column(name = "remaining_rooms", nullable = false)
    private Integer remainingRooms;
    
    @Column(name = "trust", precision = 3, scale = 2)
    private BigDecimal trust;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors
    public Deal() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Deal(String hotelName, BigDecimal originalPrice, BigDecimal discountedPrice, 
                Integer discountPct, LocalDateTime startTime, LocalDateTime endTime, 
                Integer remainingRooms, BigDecimal trust) {
        this();
        this.hotelName = hotelName;
        this.originalPrice = originalPrice;
        this.discountedPrice = discountedPrice;
        this.discountPct = discountPct;
        this.startTime = startTime;
        this.endTime = endTime;
        this.remainingRooms = remainingRooms;
        this.trust = trust;
    }
    
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
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    // Business methods
    public boolean isActive() {
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(startTime) && now.isBefore(endTime) && remainingRooms > 0;
    }
    
    public void decreaseRemainingRooms() {
        if (remainingRooms > 0) {
            remainingRooms--;
        }
    }
}
