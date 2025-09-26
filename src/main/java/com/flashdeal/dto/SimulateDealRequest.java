package com.flashdeal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SimulateDealRequest {
    
    @NotBlank(message = "호텔명은 필수입니다")
    private String hotelName;
    
    @NotNull(message = "원가는 필수입니다")
    @Positive(message = "원가는 양수여야 합니다")
    private BigDecimal originalPrice;
    
    @NotNull(message = "할인가는 필수입니다")
    @Positive(message = "할인가는 양수여야 합니다")
    private BigDecimal discountedPrice;
    
    @NotNull(message = "할인율은 필수입니다")
    @Positive(message = "할인율은 양수여야 합니다")
    private Integer discountPct;
    
    @NotNull(message = "시작 시간은 필수입니다")
    private LocalDateTime startTime;
    
    @NotNull(message = "종료 시간은 필수입니다")
    private LocalDateTime endTime;
    
    @NotNull(message = "남은 객실 수는 필수입니다")
    @Positive(message = "남은 객실 수는 양수여야 합니다")
    private Integer remainingRooms;
    
    private BigDecimal trust = BigDecimal.valueOf(0.95);
    
    // Constructors
    public SimulateDealRequest() {}
    
    // Getters and Setters
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
}
