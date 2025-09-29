import React, { useState } from 'react';
import styled from 'styled-components';
import { Star, Send, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewFormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RatingLabel = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 4px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const StarIcon = styled(Star)`
  width: 24px;
  height: 24px;
  fill: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  transition: all 0.2s ease;
`;

const RatingText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentLabel = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const CharacterCount = styled.span`
  font-size: 0.75rem;
  color: ${props => props.overLimit ? '#dc2626' : '#6b7280'};
  text-align: right;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #6b7280;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #9ca3af;
    color: #374151;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #b91c1c;
  }
  
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const ReviewForm = ({ onSubmit, onCancel, isSubmitting = false }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const ratingTexts = {
    1: '매우 나쁨',
    2: '나쁨',
    3: '보통',
    4: '좋음',
    5: '매우 좋음'
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (hovered) => {
    setHoveredRating(hovered);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit({ rating, comment: comment.trim() });
    }
  };

  const handleCancel = () => {
    setRating(0);
    setComment('');
    onCancel();
  };

  const currentRating = hoveredRating || rating;
  const isOverLimit = comment.length > 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ReviewFormContainer>
        <FormTitle>
          <Star size={20} />
          리뷰 작성
        </FormTitle>
        
        <Form onSubmit={handleSubmit}>
          <RatingSection>
            <RatingLabel>평점</RatingLabel>
            <StarRating>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingHover(star)}
                  onMouseLeave={handleRatingLeave}
                >
                  <StarIcon filled={star <= currentRating} />
                </StarButton>
              ))}
            </StarRating>
            {rating > 0 && (
              <RatingText>{ratingTexts[rating]}</RatingText>
            )}
          </RatingSection>
          
          <CommentSection>
            <CommentLabel>리뷰 내용</CommentLabel>
            <CommentTextarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="호텔에 대한 솔직한 리뷰를 작성해주세요..."
              maxLength={1000}
            />
            <CharacterCount overLimit={isOverLimit}>
              {comment.length}/1000
            </CharacterCount>
          </CommentSection>
          
          <FormActions>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
            <SubmitButton 
              type="submit" 
              disabled={rating === 0 || !comment.trim() || isOverLimit || isSubmitting}
            >
              <Send size={16} />
              {isSubmitting ? '작성 중...' : '리뷰 작성'}
            </SubmitButton>
          </FormActions>
        </Form>
      </ReviewFormContainer>
    </motion.div>
  );
};

export default ReviewForm;

