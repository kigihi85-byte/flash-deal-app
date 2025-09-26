package com.flashdeal.controller;

import com.flashdeal.dto.BookingRequest;
import com.flashdeal.entity.Booking;
import com.flashdeal.service.BookingService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@Controller
@Api(tags = "예약 관리 API")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping("/book")
    @ResponseBody
    @ApiOperation(value = "예약 생성", notes = "새로운 예약을 생성합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "예약 생성 성공"),
        @ApiResponse(code = 400, message = "예약 생성 실패")
    })
    public ResponseEntity<?> createBooking(
            @ApiParam(value = "예약 요청 데이터", required = true)
            @Valid @ModelAttribute BookingRequest request, 
            BindingResult bindingResult) {
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
    @ApiOperation(value = "예약 상세 조회", notes = "특정 예약의 상세 정보를 조회합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "예약 정보 조회 성공"),
        @ApiResponse(code = 404, message = "예약을 찾을 수 없습니다")
    })
    public String getBookingDetail(
            @ApiParam(value = "예약 ID", required = true) @PathVariable String id, 
            Model model) {
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
