package com.flashdeal.controller;

import com.flashdeal.dto.PaymentRequest;
import com.flashdeal.entity.Payment;
import com.flashdeal.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.UUID;

@Controller
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping("/pay")
    @ResponseBody
    public ResponseEntity<?> processPayment(@Valid @ModelAttribute PaymentRequest request, BindingResult bindingResult) {
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
    public String getPaymentDetail(@PathVariable String id, Model model) {
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
