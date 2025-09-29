import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Users, Flame, Calendar, Heart, X } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

const CardContainer = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #dc2626;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const DealImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${props => {
    switch(props.status) {
      case 'ACTIVE': return '#dc2626';
      case 'UPCOMING': return '#ea580c';
      case 'EXPIRED': return '#6b7280';
      default: return '#6b7280';
    }
  }};
  color: white;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const HotelName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OriginalPrice = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
`;

const DiscountBadge = styled.div`
  background: #dc2626;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const DetailsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 0.75rem;
`;

const TrustScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-size: 0.75rem;
  font-weight: 500;
`;

const RoomsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 0.75rem;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
`;

const TimeLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
`;

const TimeValue = styled.div`
  font-size: 0.875rem;
  color: #374151;
  font-weight: 600;
`;

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BookButton = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #dc2626;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
  }
`;

const NotAvailableButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  color: #9ca3af;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: not-allowed;
`;

const DealCard = ({ deal }) => {
  const { t, language } = useLanguage();

  const formatPrice = (price) => {
    return new Intl.NumberFormat(language === 'ko' ? 'ko-KR' : 'en-US', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatTimeRemaining = (timeRemaining) => {
    if (!timeRemaining) return '';
    
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${minutes}분`;
    }
  };

  const formatTimeUntilStart = (timeUntilStart) => {
    if (!timeUntilStart) return '';
    
    const hours = Math.floor(timeUntilStart / 3600);
    const minutes = Math.floor((timeUntilStart % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${minutes}분`;
    }
  };

  const getStatusText = () => {
    if (deal.active) return t('live');
    if (deal.upcoming) return t('upcoming');
    return t('expired');
  };

  const getStatusColor = () => {
    if (deal.active) return 'ACTIVE';
    if (deal.upcoming) return 'UPCOMING';
    return 'EXPIRED';
  };

  const renderStars = (score) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < score ? '#f59e0b' : '#e5e7eb'}
        color={i < score ? '#f59e0b' : '#e5e7eb'}
      />
    ));
  };

  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <ImageContainer>
        <DealImage
          src={deal.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
          alt={deal.hotelName}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
          }}
        />
        <StatusBadge status={getStatusColor()}>
          {getStatusText()}
        </StatusBadge>
        <WishlistButton>
          <Heart size={16} />
        </WishlistButton>
      </ImageContainer>

      <CardContent>
        <HotelName>{deal.hotelName}</HotelName>
        
        <Location>
          <MapPin size={14} />
          {deal.location}
        </Location>

        {deal.description && (
          <Description>{deal.description}</Description>
        )}

        <PriceSection>
          <PriceContainer>
            <OriginalPrice>{formatPrice(deal.originalPrice)}</OriginalPrice>
            <DiscountedPrice>{formatPrice(deal.discountedPrice)}</DiscountedPrice>
          </PriceContainer>
          <DiscountBadge>-{deal.discountPercentage}%</DiscountBadge>
        </PriceSection>

        <DetailsSection>
          <TrustScore>
            {renderStars(deal.trustScore)}
            <span>{deal.trustScore}/5</span>
          </TrustScore>
          <RoomsInfo>
            <Users size={12} />
            {deal.remainingRooms} {t('roomsLeft')}
          </RoomsInfo>
        </DetailsSection>

        {(deal.timeRemaining > 0 || deal.timeUntilStart > 0) && (
          <TimeInfo>
            <Clock size={14} />
            <div>
              <TimeLabel>
                {deal.active ? t('left') : t('startsIn')}
              </TimeLabel>
              <TimeValue>
                {deal.active 
                  ? formatTimeRemaining(deal.timeRemaining)
                  : formatTimeUntilStart(deal.timeUntilStart)
                }
              </TimeValue>
            </div>
          </TimeInfo>
        )}

        <ActionSection>
          {deal.active && deal.remainingRooms > 0 ? (
            <BookButton to={`/deal/${deal.id}`}>
              <Calendar size={16} />
              {t('bookNow')}
            </BookButton>
          ) : (
            <NotAvailableButton>
              <X size={16} />
              {deal.remainingRooms === 0 ? t('soldOut') : t('notAvailable')}
            </NotAvailableButton>
          )}
        </ActionSection>
      </CardContent>
    </CardContainer>
  );
};

export default DealCard;