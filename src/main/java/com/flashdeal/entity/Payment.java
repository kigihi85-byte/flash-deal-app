package com.flashdeal.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payments")
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid")
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
    
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;
    
    @Column(name = "status", length = 20)
    private String status;
    
    @Column(name = "payment_token", length = 50)
    private String paymentToken;
    
    @Column(name = "last4", length = 4)
    private String last4;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors
    public Payment() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }
    
    public Payment(Booking booking, BigDecimal amount) {
        this();
        this.booking = booking;
        this.amount = amount;
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public Booking getBooking() {
        return booking;
    }
    
    public void setBooking(Booking booking) {
        this.booking = booking;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getPaymentToken() {
        return paymentToken;
    }
    
    public void setPaymentToken(String paymentToken) {
        this.paymentToken = paymentToken;
    }
    
    public String getLast4() {
        return last4;
    }
    
    public void setLast4(String last4) {
        this.last4 = last4;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
