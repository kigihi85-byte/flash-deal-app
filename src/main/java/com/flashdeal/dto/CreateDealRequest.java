package com.flashdeal.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CreateDealRequest {
    
    @NotBlank(message = "Hotel name is required")
    @Size(max = 255, message = "Hotel name must not exceed 255 characters")
    private String hotelName;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Original price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Original price must be greater than 0")
    private BigDecimal originalPrice;
    
    @NotNull(message = "Discounted price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Discounted price must be greater than 0")
    private BigDecimal discountedPrice;
    
    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;
    
    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;
    
    @NotNull(message = "Total rooms is required")
    @Min(value = 1, message = "Total rooms must be at least 1")
    private Integer totalRooms;
    
    @NotBlank(message = "Location is required")
    @Size(max = 255, message = "Location must not exceed 255 characters")
    private String location;
    
    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;
    
    @Min(value = 1, message = "Trust score must be at least 1")
    @Max(value = 5, message = "Trust score must not exceed 5")
    private Integer trustScore = 5;
    
    // Constructors
    public CreateDealRequest() {}
    
    // Getters and Setters
    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
    
    public BigDecimal getDiscountedPrice() { return discountedPrice; }
    public void setDiscountedPrice(BigDecimal discountedPrice) { this.discountedPrice = discountedPrice; }
    
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    
    public Integer getTotalRooms() { return totalRooms; }
    public void setTotalRooms(Integer totalRooms) { this.totalRooms = totalRooms; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Integer getTrustScore() { return trustScore; }
    public void setTrustScore(Integer trustScore) { this.trustScore = trustScore; }
    
    // Business methods
    public Integer getDiscountPercentage() {
        if (originalPrice != null && discountedPrice != null && originalPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = originalPrice.subtract(discountedPrice);
            return discount.multiply(BigDecimal.valueOf(100)).divide(originalPrice, 0, BigDecimal.ROUND_HALF_UP).intValue();
        }
        return 0;
    }
    
    public boolean isValidTimeRange() {
        return startTime != null && endTime != null && startTime.isBefore(endTime);
    }
    
    public boolean isValidPriceRange() {
        return originalPrice != null && discountedPrice != null && 
               originalPrice.compareTo(discountedPrice) > 0;
    }
}
