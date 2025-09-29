import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Star, ThumbsUp, MessageCircle, Calendar, User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const ReviewDate = styled.span`
  color: #6b7280;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
`;

const StarIcon = styled(Star)`
  width: 16px;
  height: 16px;
  fill: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
`;

const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ReviewContent = styled.div`
  margin-bottom: 1rem;
`;

const ReviewComment = styled.p`
  color: #374151;
  line-height: 1.6;
  margin: 0;
`;

const ReviewActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HelpfulButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #dc2626;
  }
  
  &.helpful {
    background: #fef2f2;
    color: #dc2626;
  }
`;

const HelpfulCount = styled.span`
  font-weight: 500;
`;

const ReviewCard = ({ review, onHelpfulClick }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);

  const handleHelpfulClick = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(helpfulCount + 1);
      onHelpfulClick(review.id);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} filled={index < rating} />
    ));
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ReviewContainer>
        <ReviewHeader>
          <UserInfo>
            <UserAvatar>
              {getUserInitial(review.userName)}
            </UserAvatar>
            <UserDetails>
              <UserName>{review.userName}</UserName>
              <ReviewDate>
                <Calendar size={12} />
                {formatDate(review.createdAt)}
              </ReviewDate>
            </UserDetails>
          </UserInfo>
          
          <RatingSection>
            <StarRating>
              {renderStars(review.rating)}
            </StarRating>
            {review.isVerified && (
              <VerifiedBadge>
                <Shield size={12} />
                검증됨
              </VerifiedBadge>
            )}
          </RatingSection>
        </ReviewHeader>
        
        <ReviewContent>
          <ReviewComment>{review.comment}</ReviewComment>
        </ReviewContent>
        
        <ReviewActions>
          <HelpfulButton 
            className={isHelpful ? 'helpful' : ''}
            onClick={handleHelpfulClick}
            disabled={isHelpful}
          >
            <ThumbsUp size={14} />
            도움이 됐어요
            <HelpfulCount>({helpfulCount})</HelpfulCount>
          </HelpfulButton>
        </ReviewActions>
      </ReviewContainer>
    </motion.div>
  );
};

export default ReviewCard;

