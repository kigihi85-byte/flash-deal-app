package com.flashdeal.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public class CreateReviewRequest {
    
    @NotNull(message = "Deal ID is required")
    private UUID dealId;
    
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;
    
    @NotBlank(message = "Comment is required")
    @Size(max = 1000, message = "Comment must not exceed 1000 characters")
    private String comment;
    
    // Constructors
    public CreateReviewRequest() {}
    
    public CreateReviewRequest(UUID dealId, Integer rating, String comment) {
        this.dealId = dealId;
        this.rating = rating;
        this.comment = comment;
    }
    
    // Getters and Setters
    public UUID getDealId() {
        return dealId;
    }
    
    public void setDealId(UUID dealId) {
        this.dealId = dealId;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }
}

