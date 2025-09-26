package com.flashdeal.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.UUID;

public class BookingRequest {
    
    @NotNull(message = "딜 ID는 필수입니다")
    private UUID dealId;
    
    @NotBlank(message = "이름은 필수입니다")
    private String userName;
    
    @NotBlank(message = "연락처는 필수입니다")
    private String contact;
    
    // Constructors
    public BookingRequest() {}
    
    public BookingRequest(UUID dealId, String userName, String contact) {
        this.dealId = dealId;
        this.userName = userName;
        this.contact = contact;
    }
    
    // Getters and Setters
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
    
    public String getContact() {
        return contact;
    }
    
    public void setContact(String contact) {
        this.contact = contact;
    }
}
