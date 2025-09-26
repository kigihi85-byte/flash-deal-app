<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대시보드 - 플래시딜</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .navbar-brand {
            font-weight: bold;
            font-size: 1.5rem;
        }
        .dashboard-container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .dashboard-header {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 2rem;
            margin-bottom: 2rem;
        }
        .stats-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 1.5rem;
            text-align: center;
            transition: transform 0.3s ease;
        }
        .stats-card:hover {
            transform: translateY(-5px);
        }
        .stats-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .booking-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 1rem;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        .booking-card:hover {
            transform: translateY(-2px);
        }
        .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: bold;
        }
        .status-confirmed {
            background: #d4edda;
            color: #155724;
        }
        .status-cancelled {
            background: #f8d7da;
            color: #721c24;
        }
        .status-completed {
            background: #d1ecf1;
            color: #0c5460;
        }
        .btn-action {
            border-radius: 20px;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        .empty-state {
            text-align: center;
            padding: 3rem;
            color: #6c757d;
        }
        .empty-state i {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }
    </style>
</head>
<body>
    <!-- 네비게이션 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">
                <i class="fas fa-bolt"></i> 플래시딜
            </a>
            <div class="navbar-nav ms-auto">
                <a class="nav-link" href="/">
                    <i class="fas fa-home"></i> 메인
                </a>
                <a class="nav-link" href="/profile">
                    <i class="fas fa-user"></i> 프로필
                </a>
                <a class="nav-link" href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> 로그아웃
                </a>
            </div>
        </div>
    </nav>

    <div class="dashboard-container">
        <!-- 대시보드 헤더 -->
        <div class="dashboard-header">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h2><i class="fas fa-tachometer-alt"></i> 대시보드</h2>
                    <p class="text-muted mb-0">안녕하세요, <strong>${sessionScope.userName}</strong>님! 예약 현황을 확인해보세요.</p>
                </div>
                <div class="col-md-4 text-end">
                    <a href="/" class="btn btn-primary">
                        <i class="fas fa-plus"></i> 새로운 딜 보기
                    </a>
                </div>
            </div>
        </div>

        <!-- 통계 카드 -->
        <div class="row mb-4">
            <div class="col-md-3">
                <div class="stats-card">
                    <div class="stats-icon text-primary">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <h4>${bookings.size()}</h4>
                    <p class="text-muted mb-0">총 예약</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card">
                    <div class="stats-icon text-success">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h4>${bookings.stream().filter(b -> 'CONFIRMED'.equals(b.status)).count()}</h4>
                    <p class="text-muted mb-0">확정된 예약</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card">
                    <div class="stats-icon text-warning">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h4>${bookings.stream().filter(b -> 'PENDING'.equals(b.status)).count()}</h4>
                    <p class="text-muted mb-0">대기 중</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card">
                    <div class="stats-icon text-info">
                        <i class="fas fa-won-sign"></i>
                    </div>
                    <h4>
                        <fmt:formatNumber value="${bookings.stream().filter(b -> 'CONFIRMED'.equals(b.status)).mapToDouble(b -> b.deal.discountedPrice.doubleValue()).sum()}" type="currency" currencySymbol="₩"/>
                    </h4>
                    <p class="text-muted mb-0">총 결제 금액</p>
                </div>
            </div>
        </div>

        <!-- 예약 목록 -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-list"></i> 내 예약 목록
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <c:choose>
                            <c:when test="${empty bookings}">
                                <div class="empty-state">
                                    <i class="fas fa-calendar-times"></i>
                                    <h5>아직 예약이 없습니다</h5>
                                    <p>특가 딜을 확인하고 예약해보세요!</p>
                                    <a href="/" class="btn btn-primary">
                                        <i class="fas fa-search"></i> 딜 보러가기
                                    </a>
                                </div>
                            </c:when>
                            <c:otherwise>
                                <c:forEach var="booking" items="${bookings}">
                                    <div class="booking-card">
                                        <div class="row align-items-center p-3">
                                            <div class="col-md-2">
                                                <div class="text-center">
                                                    <i class="fas fa-hotel fa-2x text-primary"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <h6 class="mb-1">${booking.deal.hotelName}</h6>
                                                <p class="text-muted mb-1">예약자: ${booking.userName}</p>
                                                <p class="text-muted mb-0">연락처: ${booking.contact}</p>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="text-center">
                                                    <div class="h6 text-primary mb-0">
                                                        <fmt:formatNumber value="${booking.deal.discountedPrice}" type="currency" currencySymbol="₩"/>
                                                    </div>
                                                    <small class="text-muted">
                                                        <s><fmt:formatNumber value="${booking.deal.originalPrice}" type="currency" currencySymbol="₩"/></s>
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="text-center">
                                                    <span class="status-badge status-${booking.status.toLowerCase()}">
                                                        <c:choose>
                                                            <c:when test="${booking.status == 'CONFIRMED'}">확정</c:when>
                                                            <c:when test="${booking.status == 'CANCELLED'}">취소</c:when>
                                                            <c:when test="${booking.status == 'COMPLETED'}">완료</c:when>
                                                            <c:otherwise>${booking.status}</c:otherwise>
                                                        </c:choose>
                                                    </span>
                                                    <div class="mt-1">
                                                        <small class="text-muted">
                                                            <fmt:formatDate value="${booking.bookedAt}" pattern="MM/dd HH:mm"/>
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="text-end">
                                                    <c:if test="${booking.status == 'CONFIRMED'}">
                                                        <button class="btn btn-outline-danger btn-action me-1" 
                                                                onclick="cancelBooking('${booking.id}')">
                                                            <i class="fas fa-times"></i> 취소
                                                        </button>
                                                    </c:if>
                                                    <button class="btn btn-outline-primary btn-action" 
                                                            onclick="viewBooking('${booking.id}')">
                                                        <i class="fas fa-eye"></i> 상세
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </c:forEach>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function logout() {
            if (confirm('로그아웃 하시겠습니까?')) {
                fetch('/api/logout', {
                    method: 'POST'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = '/';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    window.location.href = '/';
                });
            }
        }
        
        function cancelBooking(bookingId) {
            if (confirm('정말로 예약을 취소하시겠습니까?')) {
                fetch(`/api/user/bookings/${bookingId}/cancel`, {
                    method: 'POST'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('예약이 취소되었습니다.');
                        location.reload();
                    } else {
                        alert('예약 취소에 실패했습니다.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('예약 취소 중 오류가 발생했습니다.');
                });
            }
        }
        
        function viewBooking(bookingId) {
            window.location.href = `/api/user/bookings/${bookingId}`;
        }
    </script>
</body>
</html>
