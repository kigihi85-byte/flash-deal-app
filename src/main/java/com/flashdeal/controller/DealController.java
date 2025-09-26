package com.flashdeal.controller;

import com.flashdeal.dto.DealDto;
import com.flashdeal.dto.SimulateDealRequest;
import com.flashdeal.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@Controller
public class DealController {
    
    @Autowired
    private DealService dealService;
    
    @GetMapping("/")
    public String index(Model model) {
        List<DealDto> activeDeals = dealService.getActiveDeals();
        model.addAttribute("deals", activeDeals);
        return "index";
    }
    
    @GetMapping("/api/deals")
    @ResponseBody
    public ResponseEntity<List<DealDto>> getDeals() {
        List<DealDto> deals = dealService.getActiveDeals();
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/deal/{id}")
    public String getDealDetail(@PathVariable String id, Model model) {
        try {
            DealDto deal = dealService.getDealById(java.util.UUID.fromString(id));
            if (deal == null) {
                return "error";
            }
            model.addAttribute("deal", deal);
            return "dealDetail";
        } catch (IllegalArgumentException e) {
            return "error";
        }
    }
    
    @PostMapping("/simulate/deal")
    @ResponseBody
    public ResponseEntity<?> createDeal(@Valid @RequestBody SimulateDealRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("입력 데이터가 올바르지 않습니다.");
        }
        
        try {
            DealDto deal = dealService.createDeal(request);
            return ResponseEntity.ok(deal);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("딜 생성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
    @PostMapping("/simulate/deal")
    @ResponseBody
    public ResponseEntity<?> createDealForm(@Valid @ModelAttribute SimulateDealRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("입력 데이터가 올바르지 않습니다.");
        }
        
        try {
            DealDto deal = dealService.createDeal(request);
            return ResponseEntity.ok(deal);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("딜 생성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
