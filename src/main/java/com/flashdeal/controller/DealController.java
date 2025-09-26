package com.flashdeal.controller;

import com.flashdeal.dto.CreateDealRequest;
import com.flashdeal.dto.DealDto;
import com.flashdeal.service.DealService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/deals")
@CrossOrigin(origins = "*")
public class DealController {
    
    @Autowired
    private DealService dealService;
    
    @GetMapping("/active")
    public ResponseEntity<List<DealDto>> getActiveDeals() {
        List<DealDto> deals = dealService.getActiveDeals();
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<DealDto>> getUpcomingDeals() {
        List<DealDto> deals = dealService.getUpcomingDeals();
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/active/paginated")
    public ResponseEntity<Page<DealDto>> getActiveDealsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DealDto> deals = dealService.getActiveDealsWithPagination(pageable);
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DealDto> getDealById(@PathVariable UUID id) {
        return dealService.getDealById(id)
                .map(deal -> ResponseEntity.ok(deal))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<DealDto>> searchDeals(@RequestParam String q) {
        List<DealDto> deals = dealService.searchDeals(q);
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/price-range")
    public ResponseEntity<List<DealDto>> getDealsByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<DealDto> deals = dealService.getDealsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/discount")
    public ResponseEntity<List<DealDto>> getDealsByMinDiscount(@RequestParam Integer minDiscount) {
        List<DealDto> deals = dealService.getDealsByMinDiscount(minDiscount);
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/ending-soon")
    public ResponseEntity<List<DealDto>> getDealsEndingSoon(@RequestParam(defaultValue = "24") int hours) {
        List<DealDto> deals = dealService.getDealsEndingSoon(hours);
        return ResponseEntity.ok(deals);
    }
    
    @PostMapping
    public ResponseEntity<DealDto> createDeal(@Valid @RequestBody CreateDealRequest request) {
        try {
            DealDto deal = dealService.createDeal(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(deal);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DealDto> updateDeal(@PathVariable UUID id, @Valid @RequestBody CreateDealRequest request) {
        try {
            DealDto deal = dealService.updateDeal(id, request);
            return ResponseEntity.ok(deal);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable UUID id) {
        try {
            dealService.deleteDeal(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{id}/book")
    public ResponseEntity<Void> bookRoom(@PathVariable UUID id) {
        try {
            dealService.bookRoom(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable UUID id) {
        try {
            dealService.cancelBooking(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/stats/count")
    public ResponseEntity<Long> getActiveDealsCount() {
        long count = dealService.getActiveDealsCount();
        return ResponseEntity.ok(count);
    }
}