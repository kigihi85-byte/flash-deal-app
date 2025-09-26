<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>결제하기 - 플래시딜</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .payment-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .payment-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .payment-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        .payment-body {
            padding: 2rem;
        }
        .deal-summary {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        .btn-payment {
            background: linear-gradient(45deg, #28a745, #20c997);
            border: none;
            color: white;
            padding: 12px 2rem;
            border-radius: 25px;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
        }
        .btn-payment:hover {
            background: linear-gradient(45deg, #20c997, #17a2b8);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
        .card-icon {
            color: #6c757d;
            margin-right: 0.5rem;
        }
        .security-badge {
            background: #e3f2fd;
            color: #1976d2;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            display: inline-flex;
            align-items: center;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="payment-container">
        <div class="payment-card">
            <div class="payment-header">
                <h2><i class="fas fa-credit-card"></i> 결제하기</h2>
                <p class="mb-0">안전하고 빠른 결제를 진행해주세요</p>
            </div>
            
            <div class="payment-body">
                <!-- 예약 정보 요약 -->
                <div class="deal-summary">
                    <h5><i class="fas fa-hotel"></i> 예약 정보</h5>
                    <div class="row">
                        <div class="col-md-8">
                            <h6 id="hotelName">${booking.deal.hotelName}</h6>
                            <p class="text-muted mb-1">예약자: ${booking.userName}</p>
                            <p class="text-muted mb-0">연락처: ${booking.contact}</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <div class="h5 text-primary mb-0">
                                <fmt:formatNumber value="${booking.deal.discountedPrice}" type="currency" currencySymbol="₩"/>
                            </div>
                            <small class="text-muted">
                                <s><fmt:formatNumber value="${booking.deal.originalPrice}" type="currency" currencySymbol="₩"/></s>
                                <span class="badge bg-danger ms-1">${booking.deal.discountPct}% 할인</span>
                            </small>
                        </div>
                    </div>
                </div>
                
                <!-- 결제 폼 -->
                <form id="paymentForm">
                    <input type="hidden" id="bookingId" value="${booking.id}">
                    <input type="hidden" id="amount" value="${booking.deal.discountedPrice}">
                    
                    <div class="row">
                        <div class="col-md-8">
                            <h5><i class="fas fa-credit-card"></i> 카드 정보</h5>
                            
                            <div class="mb-3">
                                <label class="form-label">카드 번호</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-credit-card card-icon"></i></span>
                                    <input type="text" class="form-control" name="cardNumber" 
                                           placeholder="1234 5678 9012 3456" maxlength="19" required>
                                </div>
                                <small class="text-muted">13-19자리 숫자를 입력해주세요</small>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="form-label">만료 월</label>
                                    <select class="form-select" name="expiryMonth" required>
                                        <option value="">월</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">만료 연도</label>
                                    <select class="form-select" name="expiryYear" required>
                                        <option value="">년</option>
                                        <option value="25">2025</option>
                                        <option value="26">2026</option>
                                        <option value="27">2027</option>
                                        <option value="28">2028</option>
                                        <option value="29">2029</option>
                                        <option value="30">2030</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">CVC</label>
                                    <input type="text" class="form-control" name="cvc" 
                                           placeholder="123" maxlength="4" required>
                                </div>
                            </div>
                            
                            <div class="security-badge">
                                <i class="fas fa-shield-alt me-2"></i>
                                SSL 보안 결제로 안전하게 처리됩니다
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card bg-light p-3">
                                <h6>결제 요약</h6>
                                <div class="d-flex justify-content-between mb-2">
                                    <span>객실 요금</span>
                                    <span><fmt:formatNumber value="${booking.deal.discountedPrice}" type="currency" currencySymbol="₩"/></span>
                                </div>
                                <div class="d-flex justify-content-between mb-2">
                                    <span>세금 및 수수료</span>
                                    <span>₩0</span>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between fw-bold">
                                    <span>총 결제 금액</span>
                                    <span class="text-primary"><fmt:formatNumber value="${booking.deal.discountedPrice}" type="currency" currencySymbol="₩"/></span>
                                </div>
                                
                                <button type="submit" class="btn btn-payment mt-3">
                                    <i class="fas fa-lock"></i> 결제하기
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- 결제 완료 모달 -->
    <div class="modal fade" id="paymentSuccessModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle"></i> 결제 완료
                    </h5>
                </div>
                <div class="modal-body text-center">
                    <div class="mb-3">
                        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                    </div>
                    <h5>결제가 성공적으로 완료되었습니다!</h5>
                    <p class="text-muted">결제 ID: <span id="paymentId"></span></p>
                    <p class="text-muted">예약이 확정되었습니다. 이메일로 확인서를 보내드렸습니다.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="goToDashboard()">
                        <i class="fas fa-tachometer-alt"></i> 대시보드로 이동
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // 카드 번호 포맷팅
        document.querySelector('input[name="cardNumber"]').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
        
        // 결제 폼 제출
        document.getElementById('paymentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 카드 번호에서 공백 제거
            data.cardNumber = data.cardNumber.replace(/\s/g, '');
            
            const paymentData = {
                bookingId: document.getElementById('bookingId').value,
                amount: document.getElementById('amount').value,
                cardNumber: data.cardNumber,
                expiryMonth: data.expiryMonth,
                expiryYear: data.expiryYear,
                cvc: data.cvc
            };
            
            // 결제 처리
            fetch('/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(paymentData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    document.getElementById('paymentId').textContent = data.id;
                    new bootstrap.Modal(document.getElementById('paymentSuccessModal')).show();
                } else {
                    alert('결제 실패: ' + (data.message || '알 수 없는 오류'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('결제 중 오류가 발생했습니다.');
            });
        });
        
        function goToDashboard() {
            window.location.href = '/dashboard';
        }
    </script>
</body>
</html>
