package com.flashdeal.controller;

import com.flashdeal.dto.PaymentRequest;
import com.flashdeal.entity.Payment;
import com.flashdeal.service.PaymentService;
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
@Api(tags = "결제 관리 API")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping("/pay")
    @ResponseBody
    @ApiOperation(value = "결제 처리", notes = "모의 결제를 처리합니다. Luhn 알고리즘으로 카드 번호를 검증합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "결제 성공"),
        @ApiResponse(code = 400, message = "결제 실패")
    })
    public ResponseEntity<?> processPayment(
            @ApiParam(value = "결제 요청 데이터", required = true)
            @Valid @ModelAttribute PaymentRequest request, 
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("입력 데이터가 올바르지 않습니다.");
        }
        
        try {
            Payment payment = paymentService.processPayment(request);
            return ResponseEntity.ok(payment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("결제 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
    @GetMapping("/payment/{id}")
    @ApiOperation(value = "결제 상세 조회", notes = "특정 결제의 상세 정보를 조회합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "결제 정보 조회 성공"),
        @ApiResponse(code = 404, message = "결제를 찾을 수 없습니다")
    })
    public String getPaymentDetail(
            @ApiParam(value = "결제 ID", required = true) @PathVariable String id, 
            Model model) {
        try {
            Payment payment = paymentService.getPaymentById(UUID.fromString(id));
            if (payment == null) {
                return "error";
            }
            model.addAttribute("payment", payment);
            return "paymentDetail";
        } catch (IllegalArgumentException e) {
            return "error";
        }
    }
}
