package com.flashdeal.controller;

import com.flashdeal.entity.Booking;
import com.flashdeal.service.BookingService;
import com.flashdeal.service.UserService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@Api(tags = "사용자 관리 API")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private BookingService bookingService;
    
    @GetMapping("/dashboard")
    @ApiOperation(value = "사용자 대시보드", notes = "사용자 대시보드 페이지를 반환합니다.")
    public String dashboard(HttpSession session, Model model) {
        UUID userId = (UUID) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/login";
        }
        
        List<Booking> bookings = bookingService.getUserBookings(userId);
        model.addAttribute("bookings", bookings);
        
        return "dashboard";
    }
    
    @GetMapping("/api/user/bookings")
    @ResponseBody
    @ApiOperation(value = "사용자 예약 목록", notes = "현재 로그인한 사용자의 예약 목록을 반환합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "예약 목록 조회 성공"),
        @ApiResponse(code = 401, message = "로그인이 필요합니다")
    })
    public ResponseEntity<?> getUserBookings(HttpSession session) {
        UUID userId = (UUID) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        List<Booking> bookings = bookingService.getUserBookings(userId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("bookings", bookings);
        response.put("count", bookings.size());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/api/user/bookings/{bookingId}")
    @ResponseBody
    @ApiOperation(value = "예약 상세 조회", notes = "특정 예약의 상세 정보를 조회합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "예약 정보 조회 성공"),
        @ApiResponse(code = 401, message = "로그인이 필요합니다"),
        @ApiResponse(code = 403, message = "권한이 없습니다"),
        @ApiResponse(code = 404, message = "예약을 찾을 수 없습니다")
    })
    public ResponseEntity<?> getBookingDetail(
            @ApiParam(value = "예약 ID", required = true) @PathVariable UUID bookingId,
            HttpSession session) {
        
        UUID userId = (UUID) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        Booking booking = bookingService.getBookingById(bookingId);
        if (booking == null) {
            return ResponseEntity.status(404).body("예약을 찾을 수 없습니다.");
        }
        
        // 권한 확인
        if (booking.getUser() == null || !booking.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }
        
        return ResponseEntity.ok(booking);
    }
    
    @PostMapping("/api/user/bookings/{bookingId}/cancel")
    @ResponseBody
    @ApiOperation(value = "예약 취소", notes = "예약을 취소합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "예약 취소 성공"),
        @ApiResponse(code = 400, message = "예약 취소 실패"),
        @ApiResponse(code = 401, message = "로그인이 필요합니다"),
        @ApiResponse(code = 403, message = "권한이 없습니다")
    })
    public ResponseEntity<?> cancelBooking(
            @ApiParam(value = "예약 ID", required = true) @PathVariable UUID bookingId,
            HttpSession session) {
        
        UUID userId = (UUID) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        boolean success = bookingService.cancelBooking(bookingId, userId);
        if (success) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "예약이 취소되었습니다.");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("예약 취소에 실패했습니다.");
        }
    }
    
    @GetMapping("/profile")
    @ApiOperation(value = "프로필 페이지", notes = "사용자 프로필 페이지를 반환합니다.")
    public String profile(HttpSession session, Model model) {
        UUID userId = (UUID) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/login";
        }
        
        return "profile";
    }
}
