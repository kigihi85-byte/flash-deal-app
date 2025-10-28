package com.flashdeal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    private static final String FROM_EMAIL = "noreply@flashdeal.com";
    private static final String COMPANY_NAME = "FlashDeal";
    
    public void sendBookingConfirmation(String toEmail, String userName, String hotelName, 
                                     String checkIn, String checkOut, String bookingId) {
        String subject = "[" + COMPANY_NAME + "] 예약이 완료되었습니다";
        String body = buildBookingConfirmationBody(userName, hotelName, checkIn, checkOut, bookingId);
        
        sendEmail(toEmail, subject, body);
    }
    
    public void sendBookingReminder(String toEmail, String userName, String hotelName, 
                                 String checkIn, String checkOut) {
        String subject = "[" + COMPANY_NAME + "] 체크인 리마인더 - 내일 체크인입니다";
        String body = buildBookingReminderBody(userName, hotelName, checkIn, checkOut);
        
        sendEmail(toEmail, subject, body);
    }
    
    public void sendBookingCancellation(String toEmail, String userName, String hotelName, 
                                     String bookingId) {
        String subject = "[" + COMPANY_NAME + "] 예약이 취소되었습니다";
        String body = buildBookingCancellationBody(userName, hotelName, bookingId);
        
        sendEmail(toEmail, subject, body);
    }
    
    public void sendWelcomeEmail(String toEmail, String userName) {
        String subject = "[" + COMPANY_NAME + "] 회원가입을 환영합니다!";
        String body = buildWelcomeEmailBody(userName);
        
        sendEmail(toEmail, subject, body);
    }
    
    public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
        String subject = "[" + COMPANY_NAME + "] 비밀번호 재설정";
        String body = buildPasswordResetBody(userName, resetToken);
        
        sendEmail(toEmail, subject, body);
    }
    
    public void sendDealNotification(String toEmail, String userName, String hotelName, 
                                  String discountPercentage, String dealUrl) {
        String subject = "[" + COMPANY_NAME + "] 관심 호텔 특가 알림";
        String body = buildDealNotificationBody(userName, hotelName, discountPercentage, dealUrl);
        
        sendEmail(toEmail, subject, body);
    }
    
    private void sendEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            
            mailSender.send(message);
        } catch (Exception e) {
            // Log error but don't throw exception to avoid breaking the main flow
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }
    
    private String buildBookingConfirmationBody(String userName, String hotelName, 
                                             String checkIn, String checkOut, String bookingId) {
        return String.format("""
            안녕하세요 %s님,
            
            FlashDeal에서 예약이 성공적으로 완료되었습니다!
            
            📋 예약 정보
            • 호텔명: %s
            • 체크인: %s
            • 체크아웃: %s
            • 예약번호: %s
            
            💡 체크인 안내
            • 체크인 시간: 오후 3시 이후
            • 체크아웃 시간: 오전 11시 이전
            • 예약 취소는 체크인 24시간 전까지 가능합니다
            
            문의사항이 있으시면 고객센터(1588-0000)로 연락해주세요.
            
            감사합니다.
            FlashDeal 팀
            """, userName, hotelName, checkIn, checkOut, bookingId);
    }
    
    private String buildBookingReminderBody(String userName, String hotelName, 
                                         String checkIn, String checkOut) {
        return String.format("""
            안녕하세요 %s님,
            
            내일 체크인 예정인 호텔 정보를 안내드립니다.
            
            🏨 호텔 정보
            • 호텔명: %s
            • 체크인: %s
            • 체크아웃: %s
            
            📍 체크인 안내
            • 체크인 시간: 오후 3시 이후
            • 체크아웃 시간: 오전 11시 이전
            • 호텔 연락처는 예약 확인서를 확인해주세요
            
            즐거운 여행 되세요!
            
            FlashDeal 팀
            """, userName, hotelName, checkIn, checkOut);
    }
    
    private String buildBookingCancellationBody(String userName, String hotelName, String bookingId) {
        return String.format("""
            안녕하세요 %s님,
            
            예약이 취소되었습니다.
            
            📋 취소 정보
            • 호텔명: %s
            • 예약번호: %s
            
            환불은 영업일 기준 3-5일 내에 처리됩니다.
            
            문의사항이 있으시면 고객센터(1588-0000)로 연락해주세요.
            
            감사합니다.
            FlashDeal 팀
            """, userName, hotelName, bookingId);
    }
    
    private String buildWelcomeEmailBody(String userName) {
        return String.format("""
            안녕하세요 %s님,
            
            FlashDeal 회원가입을 환영합니다!
            
            🎉 회원 혜택
            • 신규 회원 10%% 할인 쿠폰
            • 특가 호텔 알림 서비스
            • 예약 내역 관리
            • 리뷰 작성 및 포인트 적립
            
            지금 바로 특가 호텔을 확인해보세요!
            https://flashdeal.com
            
            감사합니다.
            FlashDeal 팀
            """, userName);
    }
    
    private String buildPasswordResetBody(String userName, String resetToken) {
        return String.format("""
            안녕하세요 %s님,
            
            비밀번호 재설정 요청을 받았습니다.
            
            아래 링크를 클릭하여 새 비밀번호를 설정해주세요:
            https://flashdeal.com/reset-password?token=%s
            
            ⚠️ 주의사항
            • 이 링크는 24시간 후 만료됩니다
            • 본인이 요청하지 않은 경우 이 이메일을 무시해주세요
            
            문의사항이 있으시면 고객센터(1588-0000)로 연락해주세요.
            
            감사합니다.
            FlashDeal 팀
            """, userName, resetToken);
    }
    
    private String buildDealNotificationBody(String userName, String hotelName, 
                                          String discountPercentage, String dealUrl) {
        return String.format("""
            안녕하세요 %s님,
            
            관심 호텔에 특가가 등록되었습니다!
            
            🏨 특가 호텔
            • 호텔명: %s
            • 할인율: %s%%
            
            지금 바로 확인해보세요:
            %s
            
            ⏰ 한정 시간 특가이니 서둘러주세요!
            
            감사합니다.
            FlashDeal 팀
            """, userName, hotelName, discountPercentage, dealUrl);
    }
}

