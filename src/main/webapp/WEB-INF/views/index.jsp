<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>숙박 특가 플래시딜</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #efefef;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .deal-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
            position: relative;
        }
        .deal-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .deal-card.active {
            border: 2px solid #ff5a5f;
        }
        .discount-badge {
            background: linear-gradient(45deg, #ff5a5f, #ff6b6b);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            position: absolute;
            top: 15px;
            left: 15px;
            z-index: 2;
        }
        .countdown {
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 2;
        }
        .hotel-image {
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            font-weight: bold;
        }
        .price-section {
            padding: 20px;
        }
        .original-price {
            text-decoration: line-through;
            color: #999;
            font-size: 14px;
        }
        .discounted-price {
            color: #ff5a5f;
            font-size: 24px;
            font-weight: bold;
        }
        .cta-button {
            background: linear-gradient(45deg, #0070f3, #0051cc);
            border: none;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        .cta-button:hover {
            background: linear-gradient(45deg, #0051cc, #003d99);
            transform: scale(1.05);
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 112, 243, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(0, 112, 243, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 112, 243, 0); }
        }
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1050;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        .toast.show {
            transform: translateX(0);
        }
        .header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px 0;
            margin-bottom: 30px;
        }
        .simulate-section {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h1 class="mb-0 text-primary">
                        <i class="fas fa-bolt"></i> 플래시딜
                    </h1>
                    <p class="text-muted mb-0">지금 할인중인 숙박 특가</p>
                </div>
                <div class="col-md-6 text-end">
                    <div class="simulate-section">
                        <h5>테스트용 딜 생성</h5>
                        <form id="simulateForm">
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <input type="text" class="form-control form-control-sm" name="hotelName" placeholder="호텔명" required>
                                </div>
                                <div class="col-md-3">
                                    <input type="number" class="form-control form-control-sm" name="originalPrice" placeholder="원가" required>
                                </div>
                                <div class="col-md-3">
                                    <input type="number" class="form-control form-control-sm" name="discountPct" placeholder="할인율(%)" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success btn-sm mt-2">
                                <i class="fas fa-plus"></i> 딜 생성
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row" id="dealsContainer">
            <c:forEach var="deal" items="${deals}">
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="deal-card active" data-deal-id="${deal.id}">
                        <div class="discount-badge">
                            <i class="fas fa-fire"></i> ${deal.discountPct}% 할인
                        </div>
                        <div class="countdown" data-end-time="${deal.endTime}">
                            <i class="fas fa-clock"></i> <span class="time-remaining">계산중...</span>
                        </div>
                        <div class="hotel-image">
                            <i class="fas fa-hotel fa-3x"></i>
                            <div class="ms-3">
                                <div>${deal.hotelName}</div>
                                <small>신뢰도: <fmt:formatNumber value="${deal.trust * 100}" pattern="#"/>%</small>
                            </div>
                        </div>
                        <div class="price-section">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <div class="original-price">
                                        <fmt:formatNumber value="${deal.originalPrice}" type="currency" currencySymbol="₩"/>
                                    </div>
                                    <div class="discounted-price">
                                        <fmt:formatNumber value="${deal.discountedPrice}" type="currency" currencySymbol="₩"/>
                                    </div>
                                </div>
                                <div class="text-end">
                                    <small class="text-muted">남은 객실</small>
                                    <div class="fw-bold text-danger">${deal.remainingRooms}개</div>
                                </div>
                            </div>
                            <button class="cta-button" onclick="bookDeal('${deal.id}')">
                                <i class="fas fa-bolt"></i> 지금 예약하기
                            </button>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>

    <!-- Toast 알림 -->
    <div id="toast" class="toast">
        <i class="fas fa-check-circle"></i> 새로운 딜이 추가되었습니다!
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
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js"></script>
    <script>
        // WebSocket 연결
        const socket = new SockJS('/ws');
        const stompClient = Stomp.over(socket);
        
        stompClient.connect({}, function(frame) {
            console.log('WebSocket 연결됨: ' + frame);
            
            // 딜 업데이트 구독
            stompClient.subscribe('/topic/deals', function(message) {
                const data = JSON.parse(message.body);
                handleDealUpdate(data);
            });
        });
        
        // 딜 업데이트 처리
        function handleDealUpdate(data) {
            if (data.type === 'new_deal') {
                showToast();
                addNewDeal(data.payload);
            } else if (data.type === 'update_deal') {
                updateDealRemainingRooms(data.payload.id, data.payload.remainingRooms);
            }
        }
        
        // 새 딜 추가
        function addNewDeal(deal) {
            const container = document.getElementById('dealsContainer');
            const dealHtml = createDealCard(deal);
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 mb-4';
            col.innerHTML = dealHtml;
            
            // 애니메이션과 함께 추가
            col.style.opacity = '0';
            col.style.transform = 'translateX(-100px)';
            container.insertBefore(col, container.firstChild);
            
            setTimeout(() => {
                col.style.transition = 'all 0.5s ease';
                col.style.opacity = '1';
                col.style.transform = 'translateX(0)';
            }, 100);
        }
        
        // 딜 카드 HTML 생성
        function createDealCard(deal) {
            return `
                <div class="deal-card active" data-deal-id="${deal.id}">
                    <div class="discount-badge">
                        <i class="fas fa-fire"></i> ${deal.discountPct}% 할인
                    </div>
                    <div class="countdown" data-end-time="${deal.endTime}">
                        <i class="fas fa-clock"></i> <span class="time-remaining">계산중...</span>
                    </div>
                    <div class="hotel-image">
                        <i class="fas fa-hotel fa-3x"></i>
                        <div class="ms-3">
                            <div>${deal.hotelName}</div>
                            <small>신뢰도: ${Math.round(deal.trust * 100)}%</small>
                        </div>
                    </div>
                    <div class="price-section">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <div class="original-price">
                                    ₩${deal.originalPrice.toLocaleString()}
                                </div>
                                <div class="discounted-price">
                                    ₩${deal.discountedPrice.toLocaleString()}
                                </div>
                            </div>
                            <div class="text-end">
                                <small class="text-muted">남은 객실</small>
                                <div class="fw-bold text-danger">${deal.remainingRooms}개</div>
                            </div>
                        </div>
                        <button class="cta-button" onclick="bookDeal('${deal.id}')">
                            <i class="fas fa-bolt"></i> 지금 예약하기
                        </button>
                    </div>
                </div>
            `;
        }
        
        // 남은 객실 수 업데이트
        function updateDealRemainingRooms(dealId, remainingRooms) {
            const dealCard = document.querySelector(`[data-deal-id="${dealId}"]`);
            if (dealCard) {
                const remainingElement = dealCard.querySelector('.fw-bold.text-danger');
                if (remainingElement) {
                    remainingElement.textContent = remainingRooms + '개';
                }
                
                if (remainingRooms === 0) {
                    dealCard.classList.remove('active');
                    const ctaButton = dealCard.querySelector('.cta-button');
                    ctaButton.textContent = '매진';
                    ctaButton.disabled = true;
                    ctaButton.style.background = '#ccc';
                }
            }
        }
        
        // Toast 알림 표시
        function showToast() {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        
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
                } else {
                    alert('결제 실패: ' + (data.message || '알 수 없는 오류'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('결제 중 오류가 발생했습니다.');
            });
        });
        
        // 시뮬레이트 폼 제출
        document.getElementById('simulateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 할인가 계산
            const originalPrice = parseFloat(data.originalPrice);
            const discountPct = parseFloat(data.discountPct);
            const discountedPrice = originalPrice * (1 - discountPct / 100);
            
            const dealData = {
                hotelName: data.hotelName,
                originalPrice: originalPrice,
                discountedPrice: discountedPrice,
                discountPct: discountPct,
                startTime: new Date().toISOString(),
                endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12시간 후
                remainingRooms: Math.floor(Math.random() * 10) + 1,
                trust: 0.95
            };
            
            fetch('/simulate/deal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dealData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.reset();
                    showToast();
                } else {
                    alert('딜 생성 실패: ' + (data.message || '알 수 없는 오류'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('딜 생성 중 오류가 발생했습니다.');
            });
        });
        
        // 카운트다운 업데이트
        function updateCountdowns() {
            document.querySelectorAll('.countdown').forEach(function(element) {
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
            });
        }
        
        // 1초마다 카운트다운 업데이트
        setInterval(updateCountdowns, 1000);
        updateCountdowns();
    </script>
</body>
</html>
