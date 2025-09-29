-- Create database if it doesn't exist
SELECT 'CREATE DATABASE flashdeal'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'flashdeal')\gexec

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
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
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

CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id UUID REFERENCES deals(id),
    user_id UUID REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
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
CREATE INDEX IF NOT EXISTS idx_reviews_deal_id ON reviews(deal_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Insert sample data with fixed dates (always active)
INSERT INTO deals (id, hotel_name, description, original_price, discounted_price, discount_percentage, start_time, end_time, total_rooms, remaining_rooms, location, country, city, image_url, trust_score, status) VALUES
-- South Korea - Always Active Deals (Fixed dates)
(gen_random_uuid(), '그랜드 호텔 서울 | Grand Hotel Seoul', '서울 중심가의 럭셔리 호텔로 멋진 도시 전망을 제공합니다 | Luxury hotel in the heart of Seoul with amazing city views', 300000.00, 150000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 10, 10, '서울, 대한민국 | Seoul, South Korea', 'South Korea', 'Seoul', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 5, 'ACTIVE'),
(gen_random_uuid(), '부산 비치 리조트 | Busan Beach Resort', '사설 해변 접근이 가능한 아름다운 해변 리조트 | Beautiful beachfront resort with private beach access', 250000.00, 125000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 15, 12, '부산, 대한민국 | Busan, South Korea', 'South Korea', 'Busan', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),
(gen_random_uuid(), '제주 아일랜드 호텔 | Jeju Island Hotel', '온천 시설을 갖춘 전통 한국 호텔 | Traditional Korean hotel with hot spring facilities', 200000.00, 100000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 8, 5, '제주도, 대한민국 | Jeju Island, South Korea', 'South Korea', 'Jeju', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 5, 'ACTIVE'),
(gen_random_uuid(), '강남 비즈니스 호텔 | Gangnam Business Hotel', '회의 시설을 갖춘 모던 비즈니스 호텔 | Modern business hotel with conference facilities', 180000.00, 90000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 20, 20, '강남, 서울 | Gangnam, Seoul', 'South Korea', 'Seoul', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 4, 'ACTIVE'),
(gen_random_uuid(), '인천 공항 호텔 | Incheon Airport Hotel', '무료 셔틀 서비스가 제공되는 편리한 공항 호텔 | Convenient airport hotel with free shuttle service', 120000.00, 60000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 25, 18, '인천, 대한민국 | Incheon, South Korea', 'South Korea', 'Incheon', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 3, 'ACTIVE'),

-- Japan - Always Active Deals (Fixed dates)
(gen_random_uuid(), '도쿄 스카이 호텔 | Tokyo Sky Hotel', '도쿄 스카이 트리 전망을 자랑하는 고층 호텔 | High-rise hotel with Tokyo Skytree views', 400000.00, 200000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 12, 8, '도쿄, 일본 | Tokyo, Japan', 'Japan', 'Tokyo', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 5, 'ACTIVE'),
(gen_random_uuid(), '오사카 리버사이드 호텔 | Osaka Riverside Hotel', '오사카 강변의 아름다운 전망을 제공하는 호텔 | Hotel with beautiful Osaka riverside views', 350000.00, 175000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 15, 15, '오사카, 일본 | Osaka, Japan', 'Japan', 'Osaka', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 4, 'ACTIVE'),
(gen_random_uuid(), '교토 전통 호텔 | Kyoto Traditional Hotel', '전통 일본 정원을 갖춘 교토의 아름다운 호텔 | Beautiful Kyoto hotel with traditional Japanese gardens', 320000.00, 160000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 10, 6, '교토, 일본 | Kyoto, Japan', 'Japan', 'Kyoto', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 5, 'ACTIVE'),

-- Taiwan - Always Active Deals (Fixed dates)
(gen_random_uuid(), '타이페이 센트럴 호텔 | Taipei Central Hotel', '타이페이 중심가의 현대적인 비즈니스 호텔 | Modern business hotel in central Taipei', 280000.00, 140000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 18, 10, '타이페이, 대만 | Taipei, Taiwan', 'Taiwan', 'Taipei', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),

-- Hong Kong - Always Active Deals (Fixed dates)
(gen_random_uuid(), '홍콩 하버 호텔 | Hong Kong Harbor Hotel', '홍콩 빅토리아 하버의 환상적인 전망을 제공하는 럭셔리 호텔 | Luxury hotel with spectacular Victoria Harbor views', 450000.00, 225000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 14, 9, '홍콩 | Hong Kong', 'Hong Kong', 'Hong Kong', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 5, 'ACTIVE'),

-- Singapore - Always Active Deals (Fixed dates)
(gen_random_uuid(), '싱가포르 마리나 호텔 | Singapore Marina Hotel', '마리나 베이 샌즈 근처의 현대적인 호텔 | Modern hotel near Marina Bay Sands', 380000.00, 190000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 22, 22, '싱가포르 | Singapore', 'Singapore', 'Singapore', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 4, 'ACTIVE'),

-- Thailand - Always Active Deals (Fixed dates)
(gen_random_uuid(), '방콕 리버사이드 호텔 | Bangkok Riverside Hotel', '차오프라야 강변의 전통적인 태국 호텔 | Traditional Thai hotel on the Chao Phraya River', 220000.00, 110000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 16, 11, '방콕, 태국 | Bangkok, Thailand', 'Thailand', 'Bangkok', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),
(gen_random_uuid(), '푸켓 비치 리조트 | Phuket Beach Resort', '크리스탈 클리어 바다를 바라보는 아름다운 해변 리조트 | Beautiful beachfront resort overlooking crystal clear waters', 300000.00, 150000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 12, 12, '푸켓, 태국 | Phuket, Thailand', 'Thailand', 'Phuket', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 4, 'ACTIVE'),

-- Malaysia - Always Active Deals (Fixed dates)
(gen_random_uuid(), '쿠알라룸푸르 센트럴 호텔 | Kuala Lumpur Central Hotel', '페트로나스 트윈 타워 근처의 비즈니스 호텔 | Business hotel near Petronas Twin Towers', 260000.00, 130000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 19, 19, '쿠알라룸푸르, 말레이시아 | Kuala Lumpur, Malaysia', 'Malaysia', 'Kuala Lumpur', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 4, 'ACTIVE'),

-- Philippines - Always Active Deals (Fixed dates)
(gen_random_uuid(), '마닐라 베이 호텔 | Manila Bay Hotel', '마닐라 베이의 아름다운 일몰을 감상할 수 있는 호텔 | Hotel with beautiful Manila Bay sunset views', 190000.00, 95000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 13, 7, '마닐라, 필리핀 | Manila, Philippines', 'Philippines', 'Manila', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 3, 'ACTIVE'),

-- Indonesia - Always Active Deals (Fixed dates)
(gen_random_uuid(), '자카르타 비즈니스 호텔 | Jakarta Business Hotel', '자카르타 중심가의 현대적인 비즈니스 호텔 | Modern business hotel in central Jakarta', 170000.00, 85000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 24, 24, '자카르타, 인도네시아 | Jakarta, Indonesia', 'Indonesia', 'Jakarta', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 3, 'ACTIVE'),
(gen_random_uuid(), '발리 리조트 | Bali Resort', '발리의 아름다운 해변과 정글을 감상할 수 있는 리조트 | Resort with beautiful Bali beaches and jungle views', 250000.00, 125000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 15, 8, '발리, 인도네시아 | Bali, Indonesia', 'Indonesia', 'Bali', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),

-- Vietnam - Always Active Deals (Fixed dates)
(gen_random_uuid(), '호치민 시티 호텔 | Ho Chi Minh City Hotel', '사이공 강변의 전통적인 베트남 호텔 | Traditional Vietnamese hotel on the Saigon River', 150000.00, 75000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 17, 12, '호치민시, 베트남 | Ho Chi Minh City, Vietnam', 'Vietnam', 'Ho Chi Minh City', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 4, 'ACTIVE'),
(gen_random_uuid(), '하노이 올드 쿼터 호텔 | Hanoi Old Quarter Hotel', '하노이 구시가지의 전통적인 베트남 호텔 | Traditional Vietnamese hotel in Hanoi Old Quarter', 180000.00, 90000.00, 50, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 11, 11, '하노이, 베트남 | Hanoi, Vietnam', 'Vietnam', 'Hanoi', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 4, 'ACTIVE');

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

-- Insert sample reviews
INSERT INTO reviews (deal_id, user_id, rating, comment, is_verified, helpful_count) 
SELECT 
    d.id,
    u.id,
    CASE 
        WHEN RANDOM() < 0.3 THEN 5
        WHEN RANDOM() < 0.5 THEN 4
        WHEN RANDOM() < 0.7 THEN 3
        WHEN RANDOM() < 0.9 THEN 2
        ELSE 1
    END,
    CASE 
        WHEN RANDOM() < 0.2 THEN '정말 만족스러운 숙박이었습니다. 직원들이 친절하고 시설이 깔끔했어요.'
        WHEN RANDOM() < 0.4 THEN '가격 대비 훌륭한 호텔입니다. 위치도 좋고 편의시설도 잘 갖춰져 있어요.'
        WHEN RANDOM() < 0.6 THEN '보통 수준의 호텔이었습니다. 특별한 장단점은 없었어요.'
        WHEN RANDOM() < 0.8 THEN '아쉬운 점이 있었지만 전반적으로 괜찮은 호텔이었습니다.'
        ELSE '개선이 필요한 부분이 있었습니다.'
    END,
    RANDOM() < 0.7,
    FLOOR(RANDOM() * 20)
FROM deals d
CROSS JOIN users u
WHERE u.role = 'USER'
LIMIT 50;
