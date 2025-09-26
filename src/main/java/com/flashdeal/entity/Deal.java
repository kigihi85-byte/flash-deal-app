package com.flashdeal.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "deals")
public class Deal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotBlank(message = "Hotel name is required")
    @Size(max = 255, message = "Hotel name must not exceed 255 characters")
    @Column(nullable = false)
    private String hotelName;
    
    @NotBlank(message = "Description is required")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Original price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Original price must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal originalPrice;
    
    @NotNull(message = "Discounted price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Discounted price must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal discountedPrice;
    
    @NotNull(message = "Discount percentage is required")
    @Min(value = 1, message = "Discount percentage must be at least 1%")
    @Max(value = 99, message = "Discount percentage must not exceed 99%")
    @Column(nullable = false)
    private Integer discountPercentage;
    
    @NotNull(message = "Start time is required")
    @Column(nullable = false)
    private LocalDateTime startTime;
    
    @NotNull(message = "End time is required")
    @Column(nullable = false)
    private LocalDateTime endTime;
    
    @NotNull(message = "Total rooms is required")
    @Min(value = 1, message = "Total rooms must be at least 1")
    @Column(nullable = false)
    private Integer totalRooms;
    
    @NotNull(message = "Remaining rooms is required")
    @Min(value = 0, message = "Remaining rooms cannot be negative")
    @Column(nullable = false)
    private Integer remainingRooms;
    
    @NotBlank(message = "Location is required")
    @Size(max = 255, message = "Location must not exceed 255 characters")
    @Column(nullable = false)
    private String location;
    
    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;
    
    @Min(value = 1, message = "Trust score must be at least 1")
    @Max(value = 5, message = "Trust score must not exceed 5")
    @Column(nullable = false)
    private Integer trustScore = 5;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DealStatus status = DealStatus.UPCOMING;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    // Constructors
    public Deal() {}
    
    public Deal(String hotelName, String description, BigDecimal originalPrice, 
                BigDecimal discountedPrice, Integer discountPercentage,
                LocalDateTime startTime, LocalDateTime endTime, 
                Integer totalRooms, String location) {
        this.hotelName = hotelName;
        this.description = description;
        this.originalPrice = originalPrice;
        this.discountedPrice = discountedPrice;
        this.discountPercentage = discountPercentage;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalRooms = totalRooms;
        this.remainingRooms = totalRooms;
        this.location = location;
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
    
    // Business methods
    public boolean isActive() {
        LocalDateTime now = LocalDateTime.now();
        return status == DealStatus.ACTIVE && 
               !startTime.isAfter(now) && 
               endTime.isAfter(now) && 
               remainingRooms > 0;
    }
    
    public boolean isUpcoming() {
        return status == DealStatus.UPCOMING && startTime.isAfter(LocalDateTime.now());
    }
    
    public boolean isExpired() {
        return status == DealStatus.EXPIRED || 
               endTime.isBefore(LocalDateTime.now()) || 
               remainingRooms <= 0;
    }
    
    public void bookRoom() {
        if (remainingRooms > 0) {
            remainingRooms--;
            if (remainingRooms == 0) {
                status = DealStatus.SOLD_OUT;
            }
        }
    }
    
    public void cancelBooking() {
        if (remainingRooms < totalRooms) {
            remainingRooms++;
            if (status == DealStatus.SOLD_OUT) {
                status = DealStatus.ACTIVE;
            }
        }
    }
    
    public enum DealStatus {
        UPCOMING, ACTIVE, SOLD_OUT, EXPIRED, CANCELLED
    }
}
