package com.flashdeal.dto;

import jakarta.validation.constraints.*;
import java.util.UUID;

public class BookingRequest {
    
    @NotNull(message = "Deal ID is required")
    private UUID dealId;
    
    @NotNull(message = "Number of rooms is required")
    @Min(value = 1, message = "Number of rooms must be at least 1")
    @Max(value = 10, message = "Number of rooms cannot exceed 10")
    private Integer numberOfRooms = 1;
    
    @Size(max = 500, message = "Notes must not exceed 500 characters")
    private String notes;
    
    // Constructors
    public BookingRequest() {}
    
    public BookingRequest(UUID dealId, Integer numberOfRooms) {
        this.dealId = dealId;
        this.numberOfRooms = numberOfRooms;
    }
    
    // Getters and Setters
    public UUID getDealId() { return dealId; }
    public void setDealId(UUID dealId) { this.dealId = dealId; }
    
    public Integer getNumberOfRooms() { return numberOfRooms; }
    public void setNumberOfRooms(Integer numberOfRooms) { this.numberOfRooms = numberOfRooms; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
