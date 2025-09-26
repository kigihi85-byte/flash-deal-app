package com.flashdeal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;
import java.util.UUID;

public class PaymentRequest {
    
    @NotNull(message = "예약 ID는 필수입니다")
    private UUID bookingId;
    
    @NotNull(message = "결제 금액은 필수입니다")
    private BigDecimal amount;
    
    @NotBlank(message = "카드 번호는 필수입니다")
    @Pattern(regexp = "^[0-9]{13,19}$", message = "카드 번호는 13-19자리 숫자여야 합니다")
    private String cardNumber;
    
    @NotBlank(message = "만료 월은 필수입니다")
    @Pattern(regexp = "^(0[1-9]|1[0-2])$", message = "만료 월은 01-12여야 합니다")
    private String expiryMonth;
    
    @NotBlank(message = "만료 년도는 필수입니다")
    @Pattern(regexp = "^[0-9]{2}$", message = "만료 년도는 2자리 숫자여야 합니다")
    private String expiryYear;
    
    @NotBlank(message = "CVC는 필수입니다")
    @Pattern(regexp = "^[0-9]{3,4}$", message = "CVC는 3-4자리 숫자여야 합니다")
    private String cvc;
    
    // Constructors
    public PaymentRequest() {}
    
    // Getters and Setters
    public UUID getBookingId() {
        return bookingId;
    }
    
    public void setBookingId(UUID bookingId) {
        this.bookingId = bookingId;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getCardNumber() {
        return cardNumber;
    }
    
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public String getExpiryMonth() {
        return expiryMonth;
    }
    
    public void setExpiryMonth(String expiryMonth) {
        this.expiryMonth = expiryMonth;
    }
    
    public String getExpiryYear() {
        return expiryYear;
    }
    
    public void setExpiryYear(String expiryYear) {
        this.expiryYear = expiryYear;
    }
    
    public String getCvc() {
        return cvc;
    }
    
    public void setCvc(String cvc) {
        this.cvc = cvc;
    }
}
