package com.flashdeal.controller;

import com.flashdeal.dto.BookingRequest;
import com.flashdeal.entity.Booking;
import com.flashdeal.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.UUID;

@Controller
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping("/book")
    @ResponseBody
    public ResponseEntity<?> createBooking(@Valid @ModelAttribute BookingRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("입력 데이터가 올바르지 않습니다.");
        }
        
        try {
            Booking booking = bookingService.createBooking(request);
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("예약 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
    @GetMapping("/booking/{id}")
    public String getBookingDetail(@PathVariable String id, Model model) {
        try {
            Booking booking = bookingService.getBookingById(UUID.fromString(id));
            if (booking == null) {
                return "error";
            }
            model.addAttribute("booking", booking);
            return "bookingDetail";
        } catch (IllegalArgumentException e) {
            return "error";
        }
    }
}
