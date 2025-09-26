import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Users, Flame } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

const CardContainer = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
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
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${props => props.status === 'active' && `
    background: #10b981;
    color: white;
  `}
  
  ${props => props.status === 'upcoming' && `
    background: #f59e0b;
    color: white;
  `}
  
  ${props => props.status === 'sold_out' && `
    background: #ef4444;
    color: white;
  `}
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 0.875rem;
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
`;

const HotelName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const OriginalPrice = styled.span`
  color: #94a3b8;
  text-decoration: line-through;
  font-size: 0.875rem;
`;

const DiscountedPrice = styled.span`
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: 700;
`;

const PricePerNight = styled.span`
  color: #64748b;
  font-size: 0.75rem;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TrustScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const RemainingRooms = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const BookButton = styled(Link)`
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }
`;

const SoldOutButton = styled.div`
  display: block;
  width: 100%;
  background: #94a3b8;
  color: white;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: not-allowed;
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
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${t('left')}`;
  } else {
    return `${minutes}m ${t('left')}`;
  }
};

const formatTimeUntilStart = (startTime, t) => {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start - now;
  
  if (diff <= 0) return t('startingNow');
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${t('startsIn')} ${hours}h ${minutes}m`;
  } else {
    return `${t('startsIn')} ${minutes}m`;
  }
};

const DealCard = ({ deal }) => {
  const { t } = useLanguage();
  
  const getStatus = () => {
    if (deal.status === 'SOLD_OUT' || deal.remainingRooms === 0) return 'sold_out';
    if (deal.active) return 'active';
    if (deal.upcoming) return 'upcoming';
    return 'expired';
  };

  const status = getStatus();
  const canBook = status === 'active' && deal.remainingRooms > 0;

  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <DealImage
          src={deal.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
          alt={deal.hotelName}
        />
        <StatusBadge status={status}>
          {status === 'active' && t('live')}
          {status === 'upcoming' && t('upcoming')}
          {status === 'sold_out' && t('soldOut')}
          {status === 'expired' && t('expired')}
        </StatusBadge>
        <DiscountBadge>
          -{deal.discountPercentage}%
        </DiscountBadge>
      </ImageContainer>
      
      <ContentContainer>
        <HotelName>{deal.hotelName}</HotelName>
        
        <Location>
          <MapPin size={16} />
          {deal.location}
        </Location>
        
        <Description>{deal.description}</Description>
        
        <PriceContainer>
          <OriginalPrice>{formatPrice(deal.originalPrice)}</OriginalPrice>
          <DiscountedPrice>{formatPrice(deal.discountedPrice)}</DiscountedPrice>
          <PricePerNight>{t('perNight')}</PricePerNight>
        </PriceContainer>
        
        <InfoContainer>
          <TrustScore>
            <Star size={16} fill="currentColor" />
            {deal.trustScore}/5
          </TrustScore>
          <RemainingRooms>
            <Users size={16} />
            {deal.remainingRooms} {t('roomsLeft')}
          </RemainingRooms>
        </InfoContainer>
        
        <TimeContainer>
          <Clock size={16} />
          {deal.active && formatTimeRemaining(deal.endTime, t)}
          {deal.upcoming && formatTimeUntilStart(deal.startTime, t)}
          {status === 'sold_out' && t('soldOut')}
          {status === 'expired' && t('expired')}
        </TimeContainer>
        
        {canBook ? (
          <BookButton to={`/deal/${deal.id}`}>
            {t('bookNow')}
          </BookButton>
        ) : (
          <SoldOutButton>
            {status === 'sold_out' ? t('soldOut') : t('notAvailable')}
          </SoldOutButton>
        )}
      </ContentContainer>
    </CardContainer>
  );
};

export default DealCard;
