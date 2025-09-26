import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Star, Users, Calendar, Shield, CheckCircle, Wifi, Car, Coffee, Dumbbell, Utensils, Heart, Share2, Phone, Mail, Navigation } from 'lucide-react';
import { dealService } from '../services/api';
import { useDeals } from '../context/DealContext';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const DetailContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #374151;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background: #f8fafc;
    border-color: #3b82f6;
    color: #3b82f6;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StatusBadge = styled.div`
  background: ${props => {
    switch (props.status) {
      case 'active': return '#10b981';
      case 'upcoming': return '#f59e0b';
      case 'sold_out': return '#ef4444';
      case 'expired': return '#6b7280';
      default: return '#6b7280';
    }
  }};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DiscountBadge = styled.div`
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 700;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const InfoSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const HotelName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatingScore = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
`;

const RatingText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const TrustScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #059669;
  font-weight: 600;
`;

const AmenitiesSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
`;

const BookingCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
`;

const PriceSection = styled.div`
  margin-bottom: 2rem;
`;

const PriceHeader = styled.div`
  margin-bottom: 1rem;
`;

const PriceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const PriceSubtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const OriginalPrice = styled.span`
  font-size: 1.125rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #ef4444;
`;

const PricePerNight = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const SavingsInfo = styled.div`
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
`;

const BookingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const BookButton = styled.button`
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  
  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const SoldOutButton = styled.button`
  width: 100%;
  background: #6b7280;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: not-allowed;
`;

const TrustSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const TrustHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TrustTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

const TrustFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TrustFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #059669;
  font-size: 0.875rem;
`;

const ContactSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const ContactIcon = styled.div`
  background: #3b82f6;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const HotelFeaturesSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border-left: 4px solid #3b82f6;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.875rem;
`;

const ReviewsSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ReviewsSummary = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ReviewScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ScoreText = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
`;

const ReviewCount = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const ReviewBreakdown = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReviewBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ReviewLabel = styled.span`
  width: 2rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ReviewBarBg = styled.div`
  flex: 1;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const ReviewBarFill = styled.div`
  height: 100%;
  background: #3b82f6;
  border-radius: 0.25rem;
  transition: width 0.3s ease;
`;

const ReviewPercent = styled.span`
  width: 3rem;
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
`;

const RecentReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ReviewItem = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ReviewerName = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const ReviewDate = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ReviewText = styled.p`
  color: #374151;
  line-height: 1.6;
  font-size: 0.875rem;
`;

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(price);
};

const formatTimeRemaining = (endTime, t) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;
  
  if (diff <= 0) return t('expired');
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}일 ${hours}시간 ${minutes}분 ${t('left')}`;
  } else if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${t('left')}`;
  } else {
    return `${minutes}분 ${t('left')}`;
  }
};

const formatTimeUntilStart = (startTime, t) => {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start - now;
  
  if (diff <= 0) return t('startingNow');
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${t('startsIn')} ${days}일 ${hours}시간 ${minutes}분`;
  } else if (hours > 0) {
    return `${t('startsIn')} ${hours}시간 ${minutes}분`;
  } else {
    return `${t('startsIn')} ${minutes}분`;
  }
};

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookRoom } = useDeals();
  const { t } = useLanguage();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setLoading(true);
        const response = await dealService.getDealById(id);
        setDeal(response.data);
      } catch (error) {
        toast.error('딜 정보를 불러오는데 실패했습니다');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, navigate]);

  const handleBookRoom = async () => {
    try {
      setBooking(true);
      navigate(`/deal/${deal.id}/payment`);
    } catch (error) {
      toast.error('예약에 실패했습니다');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="딜 정보를 불러오는 중..." />;
  }

  if (!deal) {
    return (
      <DetailContainer>
        <Container>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            {t('backToDeals')}
          </BackButton>
        </Container>
      </DetailContainer>
    );
  }

  const getStatus = () => {
    if (deal.status === 'SOLD_OUT' || deal.remainingRooms === 0) return 'sold_out';
    if (deal.active) return 'active';
    if (deal.upcoming) return 'upcoming';
    return 'expired';
  };

  const status = getStatus();
  const canBook = status === 'active' && deal.remainingRooms > 0;
  const savings = deal.originalPrice - deal.discountedPrice;

  const getHotelImages = (hotelName) => {
    const imageMap = {
      '그랜드 호텔 서울': [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
      ],
      '부산 비치 리조트': [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
      ],
      '제주 아일랜드 호텔': [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
      ],
      '강남 비즈니스 호텔': [
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
      ],
      '인천 공항 호텔': [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
      ],
      '도쿄 스카이 호텔': [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
      ],
      '오사카 리버사이드 호텔': [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
      ],
      '타이페이 센트럴 호텔': [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
      ]
    };
    
    return imageMap[hotelName] || [
      deal.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ];
  };

  const images = getHotelImages(deal.hotelName);

  return (
    <DetailContainer>
      <Container>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          {t('backToDeals')}
        </BackButton>

        <MainContent>
          <LeftColumn>
            <ImageSection>
              <MainImage
                src={images[selectedImage]}
                alt={deal.hotelName}
              />
              <ImageOverlay>
                <StatusBadge status={status}>
                  {status === 'active' && t('live')}
                  {status === 'upcoming' && t('upcoming')}
                  {status === 'sold_out' && t('soldOut')}
                  {status === 'expired' && t('expired')}
                </StatusBadge>
                <DiscountBadge>
                  -{deal.discountPercentage}%
                </DiscountBadge>
              </ImageOverlay>
              <ActionButtons>
                <ActionButton>
                  <Heart size={20} />
                </ActionButton>
                <ActionButton>
                  <Share2 size={20} />
                </ActionButton>
              </ActionButtons>
              <ImageGrid>
                {images.map((image, index) => (
                  <ThumbnailImage
                    key={index}
                    src={image}
                    alt={`${deal.hotelName} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      border: selectedImage === index ? '2px solid #3b82f6' : 'none'
                    }}
                  />
                ))}
              </ImageGrid>
            </ImageSection>

            <InfoSection>
              <HotelName>{deal.hotelName}</HotelName>
              <Location>
                <MapPin size={20} />
                {deal.location}
              </Location>
              <Description>{deal.description}</Description>

              <RatingSection>
                <Rating>
                  <Star size={20} fill="currentColor" color="#fbbf24" />
                  <RatingScore>{deal.trustScore}</RatingScore>
                  <RatingText>/5.0</RatingText>
                </Rating>
                <TrustScore>
                  <Shield size={16} />
                  {t('trustScore')} {deal.trustScore}/5
                </TrustScore>
              </RatingSection>

              <AmenitiesSection>
                <SectionTitle>{t('amenities')}</SectionTitle>
                <AmenitiesGrid>
                  <AmenityItem>
                    <Wifi size={16} />
                    {t('freeWifi')}
                  </AmenityItem>
                  <AmenityItem>
                    <Car size={16} />
                    {t('parking')}
                  </AmenityItem>
                  <AmenityItem>
                    <Coffee size={16} />
                    {t('breakfast')}
                  </AmenityItem>
                  <AmenityItem>
                    <Dumbbell size={16} />
                    {t('gym')}
                  </AmenityItem>
                  <AmenityItem>
                    <Utensils size={16} />
                    {t('restaurant')}
                  </AmenityItem>
                  <AmenityItem>
                    <Shield size={16} />
                    {t('secureBooking')}
                  </AmenityItem>
                </AmenitiesGrid>
              </AmenitiesSection>

              <HotelFeaturesSection>
                <SectionTitle>호텔 특징 및 장점</SectionTitle>
                <FeaturesList>
                  <FeatureItem>
                    <FeatureIcon>🏨</FeatureIcon>
                    <FeatureContent>
                      <FeatureTitle>프리미엄 위치</FeatureTitle>
                      <FeatureDescription>
                        {deal.hotelName.includes('서울') && '서울 중심가 최고의 위치에서 도시의 모든 명소에 쉽게 접근할 수 있습니다.'}
                        {deal.hotelName.includes('부산') && '해운대 해변과 가까운 위치로 바다 전망을 즐길 수 있습니다.'}
                        {deal.hotelName.includes('제주') && '제주도의 아름다운 자연환경과 온천을 만끽할 수 있는 최적의 위치입니다.'}
                        {deal.hotelName.includes('강남') && '강남 비즈니스 중심가로 쇼핑과 비즈니스에 최적화된 위치입니다.'}
                        {deal.hotelName.includes('인천') && '인천국제공항과 가까워 해외여행객에게 최적의 위치를 제공합니다.'}
                        {deal.hotelName.includes('도쿄') && '도쿄 스카이 트리와 가까운 위치에서 도쿄의 아름다운 전망을 감상할 수 있습니다.'}
                        {deal.hotelName.includes('오사카') && '오사카 강변의 아름다운 전망과 도시의 활기를 동시에 즐길 수 있습니다.'}
                        {deal.hotelName.includes('타이페이') && '타이페이 중심가의 편리한 위치에서 대만의 모든 명소에 쉽게 접근할 수 있습니다.'}
                        {deal.hotelName.includes('홍콩') && '홍콩 빅토리아 하버의 환상적인 전망을 감상할 수 있는 최고의 위치입니다.'}
                        {deal.hotelName.includes('싱가포르') && '마리나 베이 샌즈 근처의 현대적인 위치에서 싱가포르의 모든 것을 경험할 수 있습니다.'}
                        {deal.hotelName.includes('방콕') && '차오프라야 강변의 전통적인 태국 문화를 체험할 수 있는 최적의 위치입니다.'}
                        {deal.hotelName.includes('쿠알라룸푸르') && '페트로나스 트윈 타워 근처의 비즈니스 중심가에 위치해 있습니다.'}
                        {deal.hotelName.includes('마닐라') && '마닐라 베이의 아름다운 일몰을 감상할 수 있는 최고의 위치입니다.'}
                        {deal.hotelName.includes('자카르타') && '자카르타 중심가의 현대적인 비즈니스 지역에 위치해 있습니다.'}
                        {deal.hotelName.includes('호치민') && '사이공 강변의 전통적인 베트남 문화를 체험할 수 있는 최적의 위치입니다.'}
                      </FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>
                  
                  <FeatureItem>
                    <FeatureIcon>⭐</FeatureIcon>
                    <FeatureContent>
                      <FeatureTitle>우수한 서비스</FeatureTitle>
                      <FeatureDescription>
                        24시간 컨시어지 서비스와 다국어 스태프가 고객의 편의를 위해 최선을 다합니다. 
                        모든 직원이 고객 만족을 최우선으로 하는 프리미엄 서비스를 제공합니다.
                      </FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>
                  
                  <FeatureItem>
                    <FeatureIcon>🍽️</FeatureIcon>
                    <FeatureContent>
                      <FeatureTitle>다양한 식음료</FeatureTitle>
                      <FeatureDescription>
                        현지 특색 요리와 국제 요리를 모두 제공하는 레스토랑과 바가 있습니다. 
                        신선한 재료로 만든 정성스러운 요리를 맛보실 수 있습니다.
                      </FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>
                  
                  <FeatureItem>
                    <FeatureIcon>🏊</FeatureIcon>
                    <FeatureContent>
                      <FeatureTitle>편의시설</FeatureTitle>
                      <FeatureDescription>
                        수영장, 피트니스 센터, 스파, 비즈니스 센터 등 다양한 편의시설을 갖추고 있습니다. 
                        휴식과 비즈니스를 모두 만족시킬 수 있는 완벽한 시설을 제공합니다.
                      </FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>
                </FeaturesList>
              </HotelFeaturesSection>

              <ReviewsSection>
                <SectionTitle>고객 리뷰</SectionTitle>
                <ReviewsSummary>
                  <ReviewScore>
                    <Star size={24} fill="currentColor" color="#fbbf24" />
                    <ScoreText>4.8</ScoreText>
                    <ReviewCount>(127개 리뷰)</ReviewCount>
                  </ReviewScore>
                  <ReviewBreakdown>
                    <ReviewBar>
                      <ReviewLabel>5점</ReviewLabel>
                      <ReviewBarBg>
                        <ReviewBarFill style={{ width: '85%' }} />
                      </ReviewBarBg>
                      <ReviewPercent>85%</ReviewPercent>
                    </ReviewBar>
                    <ReviewBar>
                      <ReviewLabel>4점</ReviewLabel>
                      <ReviewBarBg>
                        <ReviewBarFill style={{ width: '12%' }} />
                      </ReviewBarBg>
                      <ReviewPercent>12%</ReviewPercent>
                    </ReviewBar>
                    <ReviewBar>
                      <ReviewLabel>3점</ReviewLabel>
                      <ReviewBarBg>
                        <ReviewBarFill style={{ width: '2%' }} />
                      </ReviewBarBg>
                      <ReviewPercent>2%</ReviewPercent>
                    </ReviewBar>
                    <ReviewBar>
                      <ReviewLabel>2점</ReviewLabel>
                      <ReviewBarBg>
                        <ReviewBarFill style={{ width: '1%' }} />
                      </ReviewBarBg>
                      <ReviewPercent>1%</ReviewPercent>
                    </ReviewBar>
                    <ReviewBar>
                      <ReviewLabel>1점</ReviewLabel>
                      <ReviewBarBg>
                        <ReviewBarFill style={{ width: '0%' }} />
                      </ReviewBarBg>
                      <ReviewPercent>0%</ReviewPercent>
                    </ReviewBar>
                  </ReviewBreakdown>
                </ReviewsSummary>
                
                <RecentReviews>
                  <ReviewItem>
                    <ReviewHeader>
                      <ReviewerInfo>
                        <ReviewerName>김**</ReviewerName>
                        <ReviewDate>2024.09.15</ReviewDate>
                      </ReviewerInfo>
                      <ReviewRating>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" color="#fbbf24" />
                        ))}
                      </ReviewRating>
                    </ReviewHeader>
                    <ReviewText>
                      위치가 정말 좋고 시설도 깔끔했습니다. 직원분들도 친절하시고 
                      조식도 맛있었어요. 다음에도 꼭 이용하고 싶습니다!
                    </ReviewText>
                  </ReviewItem>
                  
                  <ReviewItem>
                    <ReviewHeader>
                      <ReviewerInfo>
                        <ReviewerName>이**</ReviewerName>
                        <ReviewDate>2024.09.10</ReviewDate>
                      </ReviewerInfo>
                      <ReviewRating>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" color="#fbbf24" />
                        ))}
                      </ReviewRating>
                    </ReviewHeader>
                    <ReviewText>
                      가격 대비 정말 만족스러운 호텔이었습니다. 룸도 넓고 깔끔했고, 
                      특히 전망이 정말 좋았어요. 추천합니다!
                    </ReviewText>
                  </ReviewItem>
                </RecentReviews>
              </ReviewsSection>
            </InfoSection>

            <ContactSection>
              <SectionTitle>연락처 정보</SectionTitle>
              <ContactGrid>
                <ContactItem>
                  <ContactIcon>
                    <Phone size={20} />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>전화번호</ContactLabel>
                    <ContactValue>02-1234-5678</ContactValue>
                  </ContactInfo>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <Mail size={20} />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>이메일</ContactLabel>
                    <ContactValue>info@hotel.com</ContactValue>
                  </ContactInfo>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <Navigation size={20} />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>주소</ContactLabel>
                    <ContactValue>{deal.location}</ContactValue>
                  </ContactInfo>
                </ContactItem>
              </ContactGrid>
            </ContactSection>
          </LeftColumn>

          <RightColumn>
            <BookingCard>
              <PriceSection>
                <PriceHeader>
                  <PriceTitle>{t('specialOfferPrice')}</PriceTitle>
                  <PriceSubtitle>{t('limitedTimeDeal')}</PriceSubtitle>
                </PriceHeader>
                
                <PriceContainer>
                  <OriginalPrice>{formatPrice(deal.originalPrice)}</OriginalPrice>
                  <DiscountedPrice>{formatPrice(deal.discountedPrice)}</DiscountedPrice>
                  <PricePerNight>{t('perNight')}</PricePerNight>
                </PriceContainer>
                
                <SavingsInfo>
                  {t('youSave')} {formatPrice(savings)} {t('perNight')}!
                </SavingsInfo>
              </PriceSection>

              <BookingInfo>
                <Users size={16} />
                {deal.remainingRooms} {t('roomsLeft')}
                {deal.active && (
                  <>
                    <Clock size={16} />
                    {formatTimeRemaining(deal.endTime, t)}
                  </>
                )}
              </BookingInfo>
              
              {canBook ? (
                <BookButton onClick={handleBookRoom} disabled={booking}>
                  {booking ? t('processing') : t('bookNow')}
                </BookButton>
              ) : (
                <SoldOutButton>
                  {status === 'sold_out' ? t('soldOut') : t('notAvailable')}
                </SoldOutButton>
              )}

              <TrustSection>
                <TrustHeader>
                  <Shield size={20} />
                  <TrustTitle>{t('whyBookWithFlashDeal')}</TrustTitle>
                </TrustHeader>
                <TrustFeatures>
                  <TrustFeature>
                    <CheckCircle size={16} />
                    {t('instantConfirmation')}
                  </TrustFeature>
                  <TrustFeature>
                    <CheckCircle size={16} />
                    {t('bestPriceGuarantee')}
                  </TrustFeature>
                  <TrustFeature>
                    <CheckCircle size={16} />
                    {t('freeCancellation')}
                  </TrustFeature>
                  <TrustFeature>
                    <CheckCircle size={16} />
                    {t('secureBooking')}
                  </TrustFeature>
                </TrustFeatures>
              </TrustSection>
            </BookingCard>
          </RightColumn>
        </MainContent>
      </Container>
    </DetailContainer>
  );
};

export default DealDetail;