<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${deal.hotelName} - 상세 정보</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .deal-detail-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .hotel-image-large {
            height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
        }
        .price-highlight {
            background: linear-gradient(45deg, #ff5a5f, #ff6b6b);
            color: white;
            padding: 20px;
            text-align: center;
        }
        .discount-badge-large {
            background: rgba(255,255,255,0.2);
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            display: inline-block;
        }
        .countdown-large {
            background: rgba(0,0,0,0.3);
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .booking-section {
            background: #f8f9fa;
            padding: 30px;
        }
    </style>
</head>
<body>
    <div class="container mt-4">
        <div class="row">
            <div class="col-lg-8">
                <div class="deal-detail-card">
                    <div class="hotel-image-large">
                        <div class="text-center">
                            <i class="fas fa-hotel fa-5x mb-3"></i>
                            <h2>${deal.hotelName}</h2>
                            <p class="mb-0">신뢰도: <fmt:formatNumber value="${deal.trust * 100}" pattern="#"/>%</p>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3>호텔 정보</h3>
                        <p class="text-muted">${deal.hotelName}에서 제공하는 특별 할인 상품입니다. 
                        지금 예약하시면 <strong>${deal.discountPct}%</strong> 할인된 가격으로 이용하실 수 있습니다.</p>
                        
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <h5><i class="fas fa-calendar-alt text-primary"></i> 할인 기간</h5>
                                <p>
                                    <fmt:formatDate value="${deal.startTime}" pattern="yyyy-MM-dd HH:mm"/> ~ 
                                    <fmt:formatDate value="${deal.endTime}" pattern="yyyy-MM-dd HH:mm"/>
                                </p>
                            </div>
                            <div class="col-md-6">
                                <h5><i class="fas fa-bed text-success"></i> 남은 객실</h5>
                                <p class="text-danger fw-bold fs-4">${deal.remainingRooms}개</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="deal-detail-card">
                    <div class="price-highlight">
                        <div class="discount-badge-large">
                            <i class="fas fa-fire"></i> ${deal.discountPct}% 할인
                        </div>
                        <div class="countdown-large" data-end-time="${deal.endTime}">
                            <i class="fas fa-clock"></i> <span class="time-remaining">계산중...</span>
                        </div>
                        
                        <div class="mb-3">
                            <div class="text-decoration-line-through opacity-75">
                                <fmt:formatNumber value="${deal.originalPrice}" type="currency" currencySymbol="₩"/>
                            </div>
                            <div class="display-4 fw-bold">
                                <fmt:formatNumber value="${deal.discountedPrice}" type="currency" currencySymbol="₩"/>
                            </div>
                        </div>
                        
                        <c:choose>
                            <c:when test="${deal.remainingRooms > 0}">
                                <button class="btn btn-light btn-lg w-100" onclick="bookDeal('${deal.id}')">
                                    <i class="fas fa-bolt"></i> 지금 예약하기
                                </button>
                            </c:when>
                            <c:otherwise>
                                <button class="btn btn-secondary btn-lg w-100" disabled>
                                    <i class="fas fa-times"></i> 매진
                                </button>
                            </c:otherwise>
                        </c:choose>
                    </div>
                    
                    <div class="booking-section">
                        <h5>예약 안내</h5>
                        <ul class="list-unstyled">
                            <li><i class="fas fa-check text-success"></i> 즉시 확인 가능</li>
                            <li><i class="fas fa-check text-success"></i> 무료 취소 (체크인 24시간 전)</li>
                            <li><i class="fas fa-check text-success"></i> 안전한 결제 시스템</li>
                            <li><i class="fas fa-check text-success"></i> 24시간 고객 지원</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 예약 모달 -->
    <div class="modal fade" id="bookingModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">예약하기</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form id="bookingForm">
                    <div class="modal-body">
                        <input type="hidden" id="dealId" name="dealId">
                        <div class="mb-3">
                            <label class="form-label">이름</label>
                            <input type="text" class="form-control" name="userName" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">연락처</label>
                            <input type="tel" class="form-control" name="contact" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                        <button type="submit" class="btn btn-primary">예약하기</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- 결제 모달 -->
    <div class="modal fade" id="paymentModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">결제하기</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form id="paymentForm">
                    <div class="modal-body">
                        <input type="hidden" id="bookingId" name="bookingId">
                        <input type="hidden" id="amount" name="amount">
                        <div class="mb-3">
                            <label class="form-label">카드 번호</label>
                            <input type="text" class="form-control" name="cardNumber" placeholder="1234567890123456" required>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label class="form-label">만료 월</label>
                                <input type="text" class="form-control" name="expiryMonth" placeholder="MM" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">만료 년도</label>
                                <input type="text" class="form-control" name="expiryYear" placeholder="YY" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">CVC</label>
                                <input type="text" class="form-control" name="cvc" placeholder="123" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                        <button type="submit" class="btn btn-success">결제하기</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // 예약하기
        function bookDeal(dealId) {
            document.getElementById('dealId').value = dealId;
            new bootstrap.Modal(document.getElementById('bookingModal')).show();
        }
        
        // 예약 폼 제출
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch('/book', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
                    document.getElementById('bookingId').value = data.id;
                    document.getElementById('amount').value = data.deal.discountedPrice;
                    new bootstrap.Modal(document.getElementById('paymentModal')).show();
                } else {
                    alert('예약 실패: ' + (data.message || '알 수 없는 오류'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('예약 중 오류가 발생했습니다.');
            });
        });
        
        // 결제 폼 제출
        document.getElementById('paymentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch('/pay', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
                    alert('결제가 완료되었습니다! 결제 ID: ' + data.id);
                    window.location.href = '/';
                } else {
                    alert('결제 실패: ' + (data.message || '알 수 없는 오류'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('결제 중 오류가 발생했습니다.');
            });
        });
        
        // 카운트다운 업데이트
        function updateCountdown() {
            const element = document.querySelector('.countdown-large');
            if (element) {
                const endTime = new Date(element.dataset.endTime);
                const now = new Date();
                const diff = endTime - now;
                
                if (diff > 0) {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    
                    element.querySelector('.time-remaining').textContent = 
                        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                } else {
                    element.querySelector('.time-remaining').textContent = '종료됨';
                }
            }
        }
        
        // 1초마다 카운트다운 업데이트
        setInterval(updateCountdown, 1000);
        updateCountdown();
    </script>
</body>
</html>
