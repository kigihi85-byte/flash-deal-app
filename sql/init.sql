-- 데이터베이스 및 사용자 생성
CREATE DATABASE flashdeal;
CREATE USER flashdeal WITH PASSWORD 'flashdeal123';
GRANT ALL PRIVILEGES ON DATABASE flashdeal TO flashdeal;

-- 데이터베이스 연결
\c flashdeal;

-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- deals 테이블
CREATE TABLE deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_name VARCHAR(255) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2) NOT NULL,
    discount_pct INTEGER NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    remaining_rooms INTEGER NOT NULL DEFAULT 0,
    trust DECIMAL(3,2) DEFAULT 0.95,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- bookings 테이블
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    user_name VARCHAR(100) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    booked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'CONFIRMED'
);

-- payments 테이블
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    payment_token VARCHAR(50),
    last4 VARCHAR(4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- events 테이블 (히스토리용)
CREATE TABLE events (
    seq BIGSERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_deals_time ON deals(start_time, end_time);
CREATE INDEX idx_deals_remaining ON deals(remaining_rooms);
CREATE INDEX idx_bookings_deal ON bookings(deal_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);

-- 초기 데이터 삽입
INSERT INTO deals (hotel_name, original_price, discounted_price, discount_pct, start_time, end_time, remaining_rooms, trust) VALUES
('서울 그랜드 호텔', 200000, 120000, 40, NOW() - INTERVAL '1 hour', NOW() + INTERVAL '23 hours', 5, 0.95),
('부산 해운대 리조트', 150000, 90000, 40, NOW() - INTERVAL '30 minutes', NOW() + INTERVAL '11 hours 30 minutes', 3, 0.92),
('제주 신라 호텔', 300000, 180000, 40, NOW() - INTERVAL '2 hours', NOW() + INTERVAL '22 hours', 2, 0.98),
('강릉 바다뷰 펜션', 80000, 48000, 40, NOW() - INTERVAL '15 minutes', NOW() + INTERVAL '11 hours 45 minutes', 8, 0.88),
('속초 설악산 리조트', 120000, 72000, 40, NOW() - INTERVAL '45 minutes', NOW() + INTERVAL '11 hours 15 minutes', 4, 0.90);

-- 권한 설정
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO flashdeal;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flashdeal;
