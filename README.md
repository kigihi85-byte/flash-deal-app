# FlashDeal - 아고다 스타일 숙박 특가 플랫폼

React + Spring Boot로 구현된 현대적인 숙박 특가 플래시딜 웹앱입니다. 아고다와 유사한 UI/UX와 실시간 딜 업데이트를 제공합니다.

## 🎯 최신 업데이트 (2025-09-29)

### ✨ 새로 추가된 기능
- **관리자 대시보드**: 현대적인 글래스모피즘 UI로 완전히 리디자인
- **사용자 상세 페이지**: 관리자가 사용자 정보를 상세히 확인할 수 있는 페이지
- **예약 상세 페이지**: 관리자가 예약 정보를 상세히 확인할 수 있는 페이지
- **지역별 필터링**: 서울, 부산, 제주도, 도쿄, 방콕 등 도시별 딜 필터링
- **리뷰 시스템**: 호텔 리뷰 작성, 평점, 통계 기능
- **호텔 등록**: 관리자가 새로운 호텔 딜을 등록할 수 있는 기능
- **검색 페이지**: 고급 검색 필터 (가격, 별점, 편의시설)
- **결제 및 예약 성공 페이지**: 완전한 예약 플로우

### 🎨 UI/UX 개선
- **글래스모피즘 디자인**: 반투명 카드와 블러 효과
- **그라데이션 배경**: 보라색 그라데이션으로 현대적인 느낌
- **호버 애니메이션**: 카드와 버튼에 부드러운 호버 효과
- **상태 배지**: 확인됨, 대기중, 취소됨 등 상태를 시각적으로 표시
- **반응형 디자인**: 모바일과 데스크톱 모두 최적화

## 🚀 기술 스택

- **Backend**: Java 17, Spring Boot 3.2.0, Spring MVC, Spring Data JPA
- **Frontend**: React 18, Styled Components, Framer Motion, React Router
- **Database**: PostgreSQL 15
- **Build Tool**: Maven (Backend), npm (Frontend)
- **Container**: Docker, Docker Compose
- **Authentication**: JWT + BCrypt
- **API Documentation**: Swagger/OpenAPI

## 📋 주요 기능

### 🏠 사용자 기능
- ✅ **아고다 스타일 헤더**: 네비게이션 메뉴, 검색창, 사용자 액션
- ✅ **메인 페이지**: 아름다운 배경 이미지와 중앙 검색 위젯
- ✅ **딜 카드**: 호텔 이미지, 할인 정보, 예약 버튼
- ✅ **지역별 필터링**: 서울, 부산, 제주도, 도쿄, 방콕 등 도시별 딜 필터링
- ✅ **날짜 선택기**: 체크인/체크아웃 날짜 선택
- ✅ **상세 페이지**: 호텔 상세 정보와 예약 기능
- ✅ **리뷰 시스템**: 호텔 리뷰 작성, 평점, 통계
- ✅ **검색 페이지**: 고급 검색 필터 (가격, 별점, 편의시설)
- ✅ **결제 페이지**: 카드 정보 입력, 예약 요약, 결제 처리
- ✅ **예약 성공 페이지**: 예약 완료 확인 및 상세 정보
- ✅ **마이페이지**: 사용자 정보, 예약 내역 관리
- ✅ **사용자 인증**: 회원가입, 로그인, 로그아웃
- ✅ **다국어 지원**: 한국어/영어 전환
- ✅ **반응형 디자인**: 모바일과 데스크톱 최적화

### 👨‍💼 관리자 기능
- ✅ **관리자 대시보드**: 현대적인 글래스모피즘 UI, 통계, 최근 예약, 사용자 관리
- ✅ **사용자 상세 페이지**: 사용자 정보, 예약 내역, 활동 통계 확인
- ✅ **예약 상세 페이지**: 예약 정보, 고객 정보, 결제 정보, 딜 정보 확인
- ✅ **딜 관리**: 딜 생성, 수정, 삭제 (버튼 동작 구현)
- ✅ **사용자 관리**: 사용자 목록, 권한 관리, 상세 정보 보기
- ✅ **실시간 활동**: 시스템 활동 로그
- ✅ **권한 체크**: 관리자만 접근 가능
- ✅ **호텔 등록**: 새로운 호텔 딜 등록 기능

### 🔧 개발/테스트 기능
- ✅ **Swagger API 문서**: 모든 API 엔드포인트 문서화
- ✅ **실시간 업데이트**: WebSocket을 통한 실시간 딜 업데이트
- ✅ **데이터베이스 초기화**: 샘플 데이터 자동 생성
- ✅ **Docker 컨테이너화**: 개발 환경 일관성

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
│   │   ├── PaymentController.java        # 결제 관련 컨트롤러
│   │   ├── AuthController.java           # 인증 관련 컨트롤러
│   │   └── UserController.java           # 사용자 관련 컨트롤러
│   ├── service/
│   │   ├── DealService.java              # 딜 비즈니스 로직
│   │   ├── BookingService.java           # 예약 비즈니스 로직
│   │   ├── PaymentService.java           # 결제 비즈니스 로직
│   │   └── UserService.java              # 사용자 비즈니스 로직
│   ├── entity/
│   │   ├── Deal.java                     # 딜 엔티티
│   │   ├── Booking.java                  # 예약 엔티티
│   │   ├── Payment.java                  # 결제 엔티티
│   │   ├── User.java                     # 사용자 엔티티
│   │   └── Event.java                    # 이벤트 엔티티
│   ├── repository/
│   │   ├── DealRepository.java           # 딜 리포지토리
│   │   ├── BookingRepository.java        # 예약 리포지토리
│   │   ├── PaymentRepository.java        # 결제 리포지토리
│   │   ├── UserRepository.java           # 사용자 리포지토리
│   │   └── EventRepository.java          # 이벤트 리포지토리
│   └── dto/
│       ├── DealDto.java                  # 딜 DTO
│       ├── BookingRequest.java           # 예약 요청 DTO
│       ├── PaymentRequest.java           # 결제 요청 DTO
│       ├── LoginRequest.java             # 로그인 요청 DTO
│       ├── RegisterRequest.java          # 회원가입 요청 DTO
│       └── SimulateDealRequest.java      # 딜 생성 요청 DTO
├── src/main/webapp/WEB-INF/views/
│   ├── index.jsp                         # 메인 페이지
│   ├── dealDetail.jsp                    # 딜 상세 페이지
│   ├── login.jsp                         # 로그인 페이지
│   ├── register.jsp                      # 회원가입 페이지
│   ├── dashboard.jsp                     # 사용자 대시보드
│   ├── payment.jsp                       # 결제 페이지
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

### users 테이블
- `id` (UUID): 사용자 고유 ID
- `email` (VARCHAR): 이메일 (UNIQUE)
- `password` (VARCHAR): 비밀번호 (해시)
- `name` (VARCHAR): 이름
- `phone` (VARCHAR): 전화번호
- `created_at` (TIMESTAMP): 가입 시간
- `updated_at` (TIMESTAMP): 수정 시간
- `is_active` (BOOLEAN): 활성 상태

### bookings 테이블
- `id` (UUID): 예약 고유 ID
- `deal_id` (UUID): 딜 ID (FK)
- `user_id` (UUID): 사용자 ID (FK, NULL 허용)
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

## 🔐 테스트 계정 정보

### 관리자 계정
- **이메일**: `admin@flashdeal.com`
- **비밀번호**: `password`
- **권한**: ADMIN (관리자 페이지 접근 가능)

### 일반 사용자 계정
- **이메일**: `user1@test.com`
- **비밀번호**: `password`
- **이름**: 김철수

- **이메일**: `user2@test.com`
- **비밀번호**: `password`
- **이름**: 이영희

- **이메일**: `user3@test.com`
- **비밀번호**: `password`
- **이름**: 박민수

- **이메일**: `user4@test.com`
- **비밀번호**: `password`
- **이름**: 최지영

- **이메일**: `user5@test.com`
- **비밀번호**: `password`
- **이름**: 정현우

> **참고**: 모든 테스트 계정의 비밀번호는 `password`입니다.

## 🗄️ 데이터베이스 정보

### PostgreSQL 연결 정보
- **호스트**: `localhost`
- **포트**: `5432`
- **데이터베이스**: `flashdeal`
- **사용자명**: `postgres`
- **비밀번호**: `password`

### DBeaver 연결 설정
1. **Connection Type**: PostgreSQL
2. **Host**: `localhost`
3. **Port**: `5432`
4. **Database**: `flashdeal`
5. **Username**: `postgres`
6. **Password**: `password`

## 🚀 실행 방법

### 1. Docker Compose로 실행 (권장)

```bash
# 프로젝트 클론
git clone https://github.com/kigihi85-byte/flash-deal-app.git
cd flash-deal-app

# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down

# 완전 초기화 (볼륨 포함)
docker-compose down -v
```

### 접속 정보
- **메인 페이지**: http://localhost:3000
- **관리자 페이지**: http://localhost:3000/admin
- **백엔드 API**: http://localhost:8080
- **Swagger 문서**: http://localhost:8080/swagger-ui/index.html

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

### 웹 페이지 (React)
- `GET /` - 메인 페이지 (딜 리스트)
- `GET /deal/:id` - 딜 상세 페이지
- `GET /login` - 로그인 페이지
- `GET /register` - 회원가입 페이지
- `GET /mypage` - 마이페이지
- `GET /payment` - 결제 페이지
- `GET /booking-success` - 예약 성공 페이지
- `GET /search` - 검색 페이지
- `GET /hotel-registration` - 호텔 등록 페이지
- `GET /admin` - 관리자 대시보드
- `GET /admin/user/:userId` - 사용자 상세 페이지
- `GET /admin/booking/:bookingId` - 예약 상세 페이지

### REST API (Spring Boot)
- `GET /deals/active` - 현재 활성 딜 목록
- `GET /deals/upcoming` - 예정된 딜 목록
- `GET /deals/{id}` - 딜 상세 정보
- `POST /deals` - 딜 생성 (관리자)
- `PUT /deals/{id}` - 딜 수정 (관리자)
- `DELETE /deals/{id}` - 딜 삭제 (관리자)
- `POST /api/auth/login` - 로그인
- `POST /api/auth/register` - 회원가입
- `GET /api/auth/me` - 현재 사용자 정보
- `POST /reviews` - 리뷰 작성
- `GET /reviews/deal/{dealId}` - 딜별 리뷰 목록
- `GET /reviews/stats/{dealId}` - 딜별 리뷰 통계

### Swagger API 문서
- **Swagger UI**: `http://localhost:8080/swagger-ui/index.html` - API 문서 및 테스트
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs` - API 스펙 JSON

### WebSocket
- **Endpoint**: `/ws`
- **Topic**: `/topic/deals`
- **Message Types**:
  - `new_deal`: 새 딜 추가
  - `update_deal`: 딜 정보 업데이트

## 🧪 테스트 및 시연

### 1. 기본 기능 테스트

```bash
# 1. 애플리케이션 실행 후 http://localhost:3000 접속
# 2. 메인 페이지에서 현재 활성 딜 확인
# 3. 지역별 필터링 테스트 (서울, 부산, 제주도, 도쿄, 방콕)
# 4. 딜 카드 클릭 → 상세 페이지 이동
# 5. 리뷰 작성 및 평점 확인
# 6. "지금 예약하기" 버튼 클릭 → 예약 폼
# 7. 예약 정보 입력 → 결제 폼
# 8. 결제 정보 입력 → 예약 성공 페이지
# 9. 회원가입/로그인 → 마이페이지에서 예약 내역 확인
```

### 2. 관리자 기능 테스트

```bash
# 1. 관리자 계정으로 로그인 (admin@flashdeal.com / password)
# 2. http://localhost:3000/admin 접속
# 3. 관리자 대시보드에서 통계 확인
# 4. 최근 사용자에서 "보기" 버튼 클릭 → 사용자 상세 페이지
# 5. 최근 예약에서 "보기" 버튼 클릭 → 예약 상세 페이지
# 6. 사용자 상세 페이지에서 예약 내역 확인
# 7. 예약 상세 페이지에서 고객 정보, 결제 정보 확인
# 8. 딜 정보 보기 버튼으로 딜 상세 페이지 이동
```

### 3. Swagger API 문서 및 테스트

```bash
# 1. 애플리케이션 실행 후 http://localhost:8080/swagger-ui/index.html 접속
# 2. Swagger UI에서 모든 API 엔드포인트 확인
# 3. 각 API를 직접 테스트해볼 수 있음
# 4. 요청/응답 스키마 확인 가능
# 5. 인증이 필요한 API는 "Authorize" 버튼으로 토큰 설정
```

### 4. 시뮬레이터 API 테스트

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

### 5. 사용자 인증 API 테스트

```bash
# 회원가입
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "홍길동",
    "phone": "010-1234-5678"
  }'

# 로그인
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# 현재 사용자 정보 조회 (세션 필요)
curl -X GET http://localhost:8080/api/user/me \
  -H "Cookie: JSESSIONID=<session-id>"
```

### 6. 실시간 업데이트 테스트

```bash
# 1. 브라우저에서 http://localhost:8080 접속
# 2. 다른 터미널에서 시뮬레이터 API 호출
# 3. 브라우저에서 새 딜이 실시간으로 추가되는지 확인
# 4. 예약 후 남은 객실 수가 실시간으로 업데이트되는지 확인
```

### 7. 동시 예약 테스트

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
- ✅ **세션 관리**: HttpSession을 통한 사용자 인증 상태 관리
- ✅ **비밀번호 보호**: 비밀번호 해싱 (실제 운영에서는 BCrypt 등 사용 권장)
- ✅ **이메일 중복 방지**: 회원가입 시 이메일 중복 검사

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

## 🚧 추후 구현 예정 기능

### 🔥 핵심 비즈니스 로직
- **실제 결제 연동**: 카카오페이, 토스페이먼츠, 아임포트 등 실제 결제 시스템 연동
- **이메일 알림**: 예약 확인, 결제 완료, 딜 시작/종료 알림
- **SMS 알림**: 예약 확인, 체크인 리마인더
- **실시간 재고 관리**: 동시 예약 시 오버부킹 방지
- **쿠폰/할인코드**: 추가 할인, 프로모션 코드 시스템

### 🎯 사용자 경험 개선
- **위시리스트**: 관심 호텔 저장 기능
- **예약 내역 관리**: 취소, 수정, 환불 기능
- **리뷰 관리**: 리뷰 수정/삭제, 사진 업로드
- **알림 설정**: 이메일/SMS 수신 설정
- **검색 히스토리**: 최근 검색어 저장

### 👨‍💼 관리자 기능 강화
- **대시보드 차트**: 매출, 예약 현황, 사용자 통계 시각화
- **딜 관리**: 일괄 등록, 템플릿, 자동 종료
- **사용자 관리**: 권한 변경, 계정 정지/해제
- **리뷰 관리**: 부적절한 리뷰 삭제/숨김
- **통계 리포트**: 월간/주간 리포트, Excel 다운로드

### 🔧 기술적 개선
- **이미지 업로드**: 호텔 사진, 프로필 사진 업로드
- **파일 업로드**: 호텔 소개서, 계약서 등
- **실시간 채팅**: 고객 상담 기능
- **푸시 알림**: 웹 푸시, 모바일 푸시
- **캐싱**: Redis로 성능 최적화

### 🔒 보안 및 성능
- **2FA**: 이중 인증 시스템
- **API Rate Limiting**: API 호출 제한
- **로그인 보안**: 실패 횟수 제한, IP 차단
- **데이터 백업**: 자동 백업, 복구 시스템
- **모니터링**: 에러 추적, 성능 모니터링

### 📱 모바일 및 접근성
- **PWA**: 모바일 앱처럼 설치 가능
- **반응형 개선**: 태블릿 최적화
- **다크모드**: 테마 전환 기능
- **접근성**: 스크린 리더 지원
- **다국어 확장**: 일본어, 중국어 지원

### 🎯 우선순위
- **높음**: 실제 결제 연동, 이메일 알림, 실시간 재고 관리
- **중간**: 위시리스트, 예약 내역 관리, 관리자 대시보드 차트
- **낮음**: 실시간 채팅, PWA, 다국어 확장

---

**주의**: 이 애플리케이션은 학습용 데모입니다. 실제 상용 환경에서 사용하기 전에 보안 검토와 성능 최적화가 필요합니다.
