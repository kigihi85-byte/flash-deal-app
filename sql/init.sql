-- Create database if not exists
CREATE DATABASE flashdeal;

-- Connect to the database
\c flashdeal;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(20) DEFAULT 'USER',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_name VARCHAR(255) NOT NULL,
    description TEXT,
    original_price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2) NOT NULL,
    discount_percentage INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    total_rooms INTEGER NOT NULL,
    remaining_rooms INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    trust_score INTEGER DEFAULT 5,
    status VARCHAR(20) DEFAULT 'UPCOMING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    deal_id UUID REFERENCES deals(id),
    booking_time TIMESTAMP NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    number_of_rooms INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'CONFIRMED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_start_time ON deals(start_time);
CREATE INDEX IF NOT EXISTS idx_deals_end_time ON deals(end_time);
CREATE INDEX IF NOT EXISTS idx_deals_remaining_rooms ON deals(remaining_rooms);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_deal_id ON bookings(deal_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Insert sample data
INSERT INTO deals (hotel_name, description, original_price, discounted_price, discount_percentage, start_time, end_time, total_rooms, remaining_rooms, location, image_url, trust_score, status) VALUES
('그랜드 호텔 서울 | Grand Hotel Seoul', '서울 중심가의 럭셔리 호텔로 멋진 도시 전망을 제공합니다 | Luxury hotel in the heart of Seoul with amazing city views', 300000.00, 150000.00, 50, NOW() + INTERVAL '1 hour', NOW() + INTERVAL '25 hours', 10, 10, '서울, 대한민국 | Seoul, South Korea', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 5, 'UPCOMING'),
('부산 비치 리조트 | Busan Beach Resort', '사설 해변 접근이 가능한 아름다운 해변 리조트 | Beautiful beachfront resort with private beach access', 250000.00, 125000.00, 50, NOW() - INTERVAL '1 hour', NOW() + INTERVAL '23 hours', 15, 12, '부산, 대한민국 | Busan, South Korea', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),
('제주 아일랜드 호텔 | Jeju Island Hotel', '온천 시설을 갖춘 전통 한국 호텔 | Traditional Korean hotel with hot spring facilities', 200000.00, 100000.00, 50, NOW() - INTERVAL '2 hours', NOW() + INTERVAL '22 hours', 8, 5, '제주도, 대한민국 | Jeju Island, South Korea', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 5, 'ACTIVE'),
('강남 비즈니스 호텔 | Gangnam Business Hotel', '회의 시설을 갖춘 모던 비즈니스 호텔 | Modern business hotel with conference facilities', 180000.00, 90000.00, 50, NOW() + INTERVAL '2 hours', NOW() + INTERVAL '26 hours', 20, 20, '강남, 서울 | Gangnam, Seoul', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 4, 'UPCOMING'),
('인천 공항 호텔 | Incheon Airport Hotel', '무료 셔틀 서비스가 제공되는 편리한 공항 호텔 | Convenient airport hotel with free shuttle service', 120000.00, 60000.00, 50, NOW() - INTERVAL '30 minutes', NOW() + INTERVAL '23.5 hours', 25, 18, '인천, 대한민국 | Incheon, South Korea', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 3, 'ACTIVE'),
('도쿄 스카이 호텔 | Tokyo Sky Hotel', '도쿄 스카이 트리 전망을 자랑하는 고층 호텔 | High-rise hotel with Tokyo Skytree views', 400000.00, 200000.00, 50, NOW() - INTERVAL '1 hour', NOW() + INTERVAL '23 hours', 12, 8, '도쿄, 일본 | Tokyo, Japan', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 5, 'ACTIVE'),
('오사카 리버사이드 호텔 | Osaka Riverside Hotel', '오사카 강변의 아름다운 전망을 제공하는 호텔 | Hotel with beautiful Osaka riverside views', 350000.00, 175000.00, 50, NOW() + INTERVAL '3 hours', NOW() + INTERVAL '27 hours', 15, 15, '오사카, 일본 | Osaka, Japan', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 4, 'UPCOMING'),
('타이페이 센트럴 호텔 | Taipei Central Hotel', '타이페이 중심가의 현대적인 비즈니스 호텔 | Modern business hotel in central Taipei', 280000.00, 140000.00, 50, NOW() - INTERVAL '2 hours', NOW() + INTERVAL '22 hours', 18, 10, '타이페이, 대만 | Taipei, Taiwan', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),
('홍콩 하버 호텔 | Hong Kong Harbor Hotel', '홍콩 빅토리아 하버의 환상적인 전망을 제공하는 럭셔리 호텔 | Luxury hotel with spectacular Victoria Harbor views', 450000.00, 225000.00, 50, NOW() - INTERVAL '1.5 hours', NOW() + INTERVAL '22.5 hours', 14, 9, '홍콩 | Hong Kong', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 5, 'ACTIVE'),
('싱가포르 마리나 호텔 | Singapore Marina Hotel', '마리나 베이 샌즈 근처의 현대적인 호텔 | Modern hotel near Marina Bay Sands', 380000.00, 190000.00, 50, NOW() + INTERVAL '4 hours', NOW() + INTERVAL '28 hours', 22, 22, '싱가포르 | Singapore', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 4, 'UPCOMING'),
('방콕 리버사이드 호텔 | Bangkok Riverside Hotel', '차오프라야 강변의 전통적인 태국 호텔 | Traditional Thai hotel on the Chao Phraya River', 220000.00, 110000.00, 50, NOW() - INTERVAL '45 minutes', NOW() + INTERVAL '23.25 hours', 16, 11, '방콕, 태국 | Bangkok, Thailand', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),
('쿠알라룸푸르 센트럴 호텔 | Kuala Lumpur Central Hotel', '페트로나스 트윈 타워 근처의 비즈니스 호텔 | Business hotel near Petronas Twin Towers', 260000.00, 130000.00, 50, NOW() + INTERVAL '5 hours', NOW() + INTERVAL '29 hours', 19, 19, '쿠알라룸푸르, 말레이시아 | Kuala Lumpur, Malaysia', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 4, 'UPCOMING'),
('마닐라 베이 호텔 | Manila Bay Hotel', '마닐라 베이의 아름다운 일몰을 감상할 수 있는 호텔 | Hotel with beautiful Manila Bay sunset views', 190000.00, 95000.00, 50, NOW() - INTERVAL '2.5 hours', NOW() + INTERVAL '21.5 hours', 13, 7, '마닐라, 필리핀 | Manila, Philippines', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 3, 'ACTIVE'),
('자카르타 비즈니스 호텔 | Jakarta Business Hotel', '자카르타 중심가의 현대적인 비즈니스 호텔 | Modern business hotel in central Jakarta', 170000.00, 85000.00, 50, NOW() + INTERVAL '6 hours', NOW() + INTERVAL '30 hours', 24, 24, '자카르타, 인도네시아 | Jakarta, Indonesia', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 3, 'UPCOMING'),
('호치민 시티 호텔 | Ho Chi Minh City Hotel', '사이공 강변의 전통적인 베트남 호텔 | Traditional Vietnamese hotel on the Saigon River', 150000.00, 75000.00, 50, NOW() - INTERVAL '3 hours', NOW() + INTERVAL '21 hours', 17, 12, '호치민시, 베트남 | Ho Chi Minh City, Vietnam', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE');

-- Create admin user
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@flashdeal.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Administrator', 'ADMIN');

-- Create test users
INSERT INTO users (username, email, password, full_name, phone_number, role) VALUES
('user1', 'user1@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', '김철수', '010-1234-5678', 'USER'),
('user2', 'user2@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', '이영희', '010-2345-6789', 'USER'),
('user3', 'user3@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', '박민수', '010-3456-7890', 'USER'),
('user4', 'user4@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', '최지영', '010-4567-8901', 'USER'),
('user5', 'user5@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', '정현우', '010-5678-9012', 'USER');
