# 숙박 특가 플래시딜 웹앱

Spring Boot + JSP로 구현된 실시간 숙박 특가 플래시딜 웹앱입니다. WebSocket을 통한 실시간 업데이트와 모의 결제 시스템을 포함합니다.

## 🚀 기술 스택

- **Backend**: Java 17, Spring Boot 3.2.0, Spring MVC, Spring Data JPA
- **Frontend**: JSP, Bootstrap 5, JavaScript, WebSocket (STOMP)
- **Database**: PostgreSQL 15
- **Build Tool**: Maven
- **Container**: Docker, Docker Compose
- **Real-time**: Spring WebSocket (STOMP over SockJS)

## 📋 주요 기능

### 사용자 기능
- ✅ **메인 페이지**: 현재 활성 플래시딜 카드 리스트 (썸네일, 할인배지, 할인가, 원가, 남은실, 카운트다운, CTA)
- ✅ **상세 페이지**: 호텔 상세 정보 + 원클릭 예약 버튼
- ✅ **예약 처리**: 원자적 트랜잭션으로 remaining_rooms 감소, bookings 테이블 저장
- ✅ **모의 결제**: Luhn 알고리즘 + 만료일 검증 → 성공 처리 (결제 토큰 + last4 저장)
- ✅ **실시간 UI 업데이트**: WebSocket으로 `new_deal`, `update_deal` 브로드캐스트

### 개발/테스트 기능
- ✅ **시뮬레이터 API**: `POST /simulate/deal` - 임의의 딜 생성 → DB insert → WebSocket emit
- ✅ **실시간 딜 추가**: 새딜 도착 시 top-toast + 카드 슬라이드-in 애니메이션
- ✅ **동시 예약 방지**: 오버부킹 방지 로직

## 🏗️ 프로젝트 구조

```
├── src/main/java/com/flashdeal/
│   ├── FlashDealApplication.java          # 메인 애플리케이션
│   ├── config/
│   │   ├── WebSocketConfig.java          # WebSocket 설정
│   │   └── WebConfig.java                # 웹 설정
│   ├── controller/
│   │   ├── DealController.java           # 딜 관련 컨트롤러
│   │   ├── BookingController.java        # 예약 관련 컨트롤러
│   │   └── PaymentController.java        # 결제 관련 컨트롤러
│   ├── service/
│   │   ├── DealService.java              # 딜 비즈니스 로직
│   │   ├── BookingService.java           # 예약 비즈니스 로직
│   │   └── PaymentService.java           # 결제 비즈니스 로직
│   ├── entity/
│   │   ├── Deal.java                     # 딜 엔티티
│   │   ├── Booking.java                  # 예약 엔티티
│   │   ├── Payment.java                  # 결제 엔티티
│   │   └── Event.java                    # 이벤트 엔티티
│   ├── repository/
│   │   ├── DealRepository.java           # 딜 리포지토리
│   │   ├── BookingRepository.java        # 예약 리포지토리
│   │   ├── PaymentRepository.java        # 결제 리포지토리
│   │   └── EventRepository.java          # 이벤트 리포지토리
│   └── dto/
│       ├── DealDto.java                  # 딜 DTO
│       ├── BookingRequest.java           # 예약 요청 DTO
│       ├── PaymentRequest.java           # 결제 요청 DTO
│       └── SimulateDealRequest.java      # 딜 생성 요청 DTO
├── src/main/webapp/WEB-INF/views/
│   ├── index.jsp                         # 메인 페이지
│   ├── dealDetail.jsp                    # 딜 상세 페이지
│   └── error.jsp                         # 에러 페이지
├── sql/
│   └── init.sql                          # 데이터베이스 초기화 스크립트
├── Dockerfile                            # 애플리케이션 Docker 이미지
├── docker-compose.yml                    # Docker Compose 설정
└── pom.xml                               # Maven 의존성
```

## 🗄️ 데이터베이스 스키마

### deals 테이블
- `id` (UUID): 딜 고유 ID
- `hotel_name` (VARCHAR): 호텔명
- `original_price` (DECIMAL): 원가
- `discounted_price` (DECIMAL): 할인가
- `discount_pct` (INTEGER): 할인율
- `start_time` (TIMESTAMP): 시작 시간
- `end_time` (TIMESTAMP): 종료 시간
- `remaining_rooms` (INTEGER): 남은 객실 수
- `trust` (DECIMAL): 신뢰도
- `created_at` (TIMESTAMP): 생성 시간

### bookings 테이블
- `id` (UUID): 예약 고유 ID
- `deal_id` (UUID): 딜 ID (FK)
- `user_name` (VARCHAR): 예약자명
- `contact` (VARCHAR): 연락처
- `booked_at` (TIMESTAMP): 예약 시간
- `status` (VARCHAR): 예약 상태

### payments 테이블
- `id` (UUID): 결제 고유 ID
- `booking_id` (UUID): 예약 ID (FK)
- `amount` (DECIMAL): 결제 금액
- `status` (VARCHAR): 결제 상태
- `payment_token` (VARCHAR): 결제 토큰
- `last4` (VARCHAR): 카드 번호 마지막 4자리
- `created_at` (TIMESTAMP): 결제 시간

### events 테이블
- `seq` (BIGSERIAL): 이벤트 시퀀스
- `event_type` (VARCHAR): 이벤트 타입
- `payload` (JSONB): 이벤트 데이터
- `created_at` (TIMESTAMP): 이벤트 시간

## 🚀 실행 방법

### 1. Docker Compose로 실행 (권장)

```bash
# 프로젝트 클론
git clone <repository-url>
cd flash-deal-app

# Docker Compose로 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up --build -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

### 2. 로컬 개발 환경

#### 필수 요구사항
- Java 17+
- Maven 3.6+
- PostgreSQL 15+

#### 실행 단계
```bash
# 1. PostgreSQL 데이터베이스 생성
createdb flashdeal
psql flashdeal < sql/init.sql

# 2. 애플리케이션 실행
mvn spring-boot:run

# 또는 JAR 빌드 후 실행
mvn clean package
java -jar target/*.jar
```

## 🌐 API 엔드포인트

### 웹 페이지
- `GET /` - 메인 페이지 (딜 리스트)
- `GET /deal/{id}` - 딜 상세 페이지

### REST API
- `GET /api/deals` - 현재 활성 딜 목록 (JSON)
- `POST /simulate/deal` - 테스트용 딜 생성
- `POST /book` - 예약 생성
- `POST /pay` - 모의 결제 처리

### WebSocket
- **Endpoint**: `/ws`
- **Topic**: `/topic/deals`
- **Message Types**:
  - `new_deal`: 새 딜 추가
  - `update_deal`: 딜 정보 업데이트

## 🧪 테스트 및 시연

### 1. 기본 기능 테스트

```bash
# 1. 애플리케이션 실행 후 http://localhost:8080 접속
# 2. 메인 페이지에서 현재 활성 딜 확인
# 3. 딜 카드 클릭 → 상세 페이지 이동
# 4. "지금 예약하기" 버튼 클릭 → 예약 폼
# 5. 예약 정보 입력 → 결제 폼
# 6. 결제 정보 입력 → 결제 완료
```

### 2. 시뮬레이터 API 테스트

```bash
# 새 딜 생성 (JSON)
curl -X POST http://localhost:8080/simulate/deal \
  -H "Content-Type: application/json" \
  -d '{
    "hotelName": "테스트 호텔",
    "originalPrice": 200000,
    "discountedPrice": 120000,
    "discountPct": 40,
    "startTime": "2024-01-01T10:00:00",
    "endTime": "2024-01-01T22:00:00",
    "remainingRooms": 5,
    "trust": 0.95
  }'

# 새 딜 생성 (Form)
curl -X POST http://localhost:8080/simulate/deal \
  -d "hotelName=테스트 호텔&originalPrice=200000&discountPct=40"
```

### 3. 실시간 업데이트 테스트

```bash
# 1. 브라우저에서 http://localhost:8080 접속
# 2. 다른 터미널에서 시뮬레이터 API 호출
# 3. 브라우저에서 새 딜이 실시간으로 추가되는지 확인
# 4. 예약 후 남은 객실 수가 실시간으로 업데이트되는지 확인
```

### 4. 동시 예약 테스트

```bash
# 동시에 여러 예약 요청 (오버부킹 방지 테스트)
for i in {1..5}; do
  curl -X POST http://localhost:8080/book \
    -d "dealId=<DEAL_ID>&userName=사용자$i&contact=010-1234-567$i" &
done
wait
```

## 🔒 보안 고려사항

- ✅ **카드 정보 보호**: 전체 카드번호나 CVC는 로그/DB에 저장하지 않음
- ✅ **결제 토큰**: 모의 결제 토큰과 last4만 저장
- ✅ **CSRF 보호**: Spring Security CSRF 토큰 적용 (권장)
- ✅ **입력 검증**: Bean Validation으로 입력 데이터 검증

## 📊 모니터링 및 로깅

### Health Check
- **애플리케이션**: `http://localhost:8080/actuator/health`
- **데이터베이스**: Docker Compose health check 포함

### 로그 레벨
- **개발**: `DEBUG` (com.flashdeal)
- **운영**: `INFO` (기본)

## 🐛 문제 해결

### 일반적인 문제

1. **데이터베이스 연결 실패**
   ```bash
   # PostgreSQL 컨테이너 상태 확인
   docker-compose ps postgres
   
   # 로그 확인
   docker-compose logs postgres
   ```

2. **포트 충돌**
   ```bash
   # 포트 사용 확인
   lsof -i :8080
   lsof -i :5432
   
   # docker-compose.yml에서 포트 변경
   ```

3. **빌드 실패**
   ```bash
   # Maven 캐시 정리
   mvn clean
   
   # Docker 이미지 재빌드
   docker-compose build --no-cache
   ```

## 📝 개발 가이드

### 커밋 메시지 규칙
- `feat:` - 새 기능 추가
- `fix:` - 버그 수정
- `docs:` - 문서 수정
- `style:` - 코드 스타일 변경
- `refactor:` - 코드 리팩토링
- `test:` - 테스트 추가/수정
- `chore:` - 빌드/설정 변경

### 브랜치 전략
- `main` - 프로덕션 브랜치
- `feature/user-main` - 사용자 메인 기능 개발
- `hotfix/` - 긴급 수정

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**주의**: 이 애플리케이션은 학습용 데모입니다. 실제 상용 환경에서 사용하기 전에 보안 검토와 성능 최적화가 필요합니다.
