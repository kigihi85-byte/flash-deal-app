package com.flashdeal.controller;

import com.flashdeal.dto.DealDto;
import com.flashdeal.dto.SimulateDealRequest;
import com.flashdeal.service.DealService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@Api(tags = "딜 관리 API")
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
    @ApiOperation(value = "활성 딜 목록 조회", notes = "현재 활성화된 모든 딜 목록을 반환합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공적으로 딜 목록을 조회했습니다.")
    })
    public ResponseEntity<List<DealDto>> getDeals() {
        List<DealDto> deals = dealService.getActiveDeals();
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/deal/{id}")
    @ApiOperation(value = "딜 상세 조회", notes = "특정 딜의 상세 정보를 조회합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공적으로 딜 정보를 조회했습니다."),
        @ApiResponse(code = 404, message = "딜을 찾을 수 없습니다.")
    })
    public String getDealDetail(
            @ApiParam(value = "딜 ID", required = true) @PathVariable String id, 
            Model model) {
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
    
    @PostMapping(value = "/simulate/deal", consumes = "application/json")
    @ResponseBody
    @ApiOperation(value = "테스트용 딜 생성 (JSON)", notes = "개발/테스트용으로 새로운 딜을 생성합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공적으로 딜을 생성했습니다."),
        @ApiResponse(code = 400, message = "입력 데이터가 올바르지 않습니다.")
    })
    public ResponseEntity<?> createDeal(
            @ApiParam(value = "딜 생성 요청 데이터", required = true) 
            @Valid @RequestBody SimulateDealRequest request, 
            BindingResult bindingResult) {
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
    
    @PostMapping(value = "/simulate/deal", consumes = "application/x-www-form-urlencoded")
    @ResponseBody
    @ApiOperation(value = "테스트용 딜 생성 (Form)", notes = "개발/테스트용으로 새로운 딜을 생성합니다. (Form 데이터)")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공적으로 딜을 생성했습니다."),
        @ApiResponse(code = 400, message = "입력 데이터가 올바르지 않습니다.")
    })
    public ResponseEntity<?> createDealForm(
            @ApiParam(value = "딜 생성 요청 데이터", required = true) 
            @Valid @ModelAttribute SimulateDealRequest request, 
            BindingResult bindingResult) {
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
