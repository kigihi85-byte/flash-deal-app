package com.flashdeal.service;

import com.flashdeal.dto.PaymentRequest;
import com.flashdeal.entity.Booking;
import com.flashdeal.entity.Payment;
import com.flashdeal.repository.BookingRepository;
import com.flashdeal.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public Payment processPayment(PaymentRequest request) {
        // 예약 확인
        UUID bookingId = UUID.fromString(request.getBookingId());
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null) {
            throw new IllegalArgumentException("존재하지 않는 예약입니다.");
        }
        
        // 카드 번호 검증 (Luhn 알고리즘)
        if (!isValidCardNumber(request.getCardNumber())) {
            throw new IllegalArgumentException("유효하지 않은 카드 번호입니다.");
        }
        
        // 만료일 검증
        if (!isValidExpiryDate(request.getExpiryMonth(), request.getExpiryYear())) {
            throw new IllegalArgumentException("만료된 카드입니다.");
        }
        
        // 결제 생성
        Payment payment = new Payment(booking, request.getAmount());
        
        // 모의 결제 토큰 생성 (실제로는 카드사 API 호출)
        String paymentToken = generateMockPaymentToken();
        String last4 = request.getCardNumber().substring(request.getCardNumber().length() - 4);
        
        payment.setPaymentToken(paymentToken);
        payment.setLast4(last4);
        payment.setStatus("COMPLETED");
        
        return paymentRepository.save(payment);
    }
    
    public Payment getPaymentById(UUID id) {
        return paymentRepository.findById(id).orElse(null);
    }
    
    private boolean isValidCardNumber(String cardNumber) {
        // Luhn 알고리즘 구현
        int sum = 0;
        boolean alternate = false;
        
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(cardNumber.charAt(i));
            
            if (alternate) {
                digit *= 2;
                if (digit > 9) {
                    digit = (digit % 10) + 1;
                }
            }
            
            sum += digit;
            alternate = !alternate;
        }
        
        return (sum % 10) == 0;
    }
    
    private boolean isValidExpiryDate(String month, String year) {
        try {
            int expMonth = Integer.parseInt(month);
            int expYear = Integer.parseInt(year) + 2000; // 2자리 년도를 4자리로 변환
            
            java.time.YearMonth expiryDate = java.time.YearMonth.of(expYear, expMonth);
            java.time.YearMonth currentDate = java.time.YearMonth.now();
            
            return !expiryDate.isBefore(currentDate);
        } catch (NumberFormatException e) {
            return false;
        }
    }
    
    private String generateMockPaymentToken() {
        // 모의 결제 토큰 생성 (실제로는 카드사에서 제공)
        return "tok_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16);
    }
}
