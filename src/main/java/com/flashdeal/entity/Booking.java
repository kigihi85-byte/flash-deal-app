package com.flashdeal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bookings")
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid")
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_id", nullable = false)
    private Deal deal;
    
    @Column(name = "user_name", nullable = false, length = 100)
    private String userName;
    
    @Column(name = "contact", nullable = false, length = 50)
    private String contact;
    
    @Column(name = "booked_at")
    private LocalDateTime bookedAt;
    
    @Column(name = "status", length = 20)
    private String status;
    
    // Constructors
    public Booking() {
        this.bookedAt = LocalDateTime.now();
        this.status = "CONFIRMED";
    }
    
    public Booking(Deal deal, String userName, String contact) {
        this();
        this.deal = deal;
        this.userName = userName;
        this.contact = contact;
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public Deal getDeal() {
        return deal;
    }
    
    public void setDeal(Deal deal) {
        this.deal = deal;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getContact() {
        return contact;
    }
    
    public void setContact(String contact) {
        this.contact = contact;
    }
    
    public LocalDateTime getBookedAt() {
        return bookedAt;
    }
    
    public void setBookedAt(LocalDateTime bookedAt) {
        this.bookedAt = bookedAt;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}
