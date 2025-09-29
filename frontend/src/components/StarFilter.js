import React, { useState } from 'react';
import styled from 'styled-components';
import { Star } from 'lucide-react';

const StarFilterContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
  }
  
  &.selected {
    background: #fef2f2;
    color: #dc2626;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #dc2626;
`;

const StarDisplay = styled.div`
  display: flex;
  gap: 2px;
`;

const StarIcon = styled(Star)`
  width: 16px;
  height: 16px;
  fill: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
`;

const StarLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const CountLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-left: auto;
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
`;

const StarFilter = ({ onStarChange, selectedStars = [] }) => {
  const [stars, setStars] = useState(selectedStars);

  const starOptions = [
    { value: 5, label: '5성급', count: 12 },
    { value: 4, label: '4성급', count: 28 },
    { value: 3, label: '3성급', count: 45 },
    { value: 2, label: '2성급', count: 23 },
    { value: 1, label: '1성급', count: 8 },
  ];

  const handleStarChange = (starValue) => {
    const newStars = stars.includes(starValue)
      ? stars.filter(s => s !== starValue)
      : [...stars, starValue];
    
    setStars(newStars);
    onStarChange(newStars);
  };

  const clearFilter = () => {
    setStars([]);
    onStarChange([]);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        filled={index < count}
      />
    ));
  };

  return (
    <StarFilterContainer>
      <FilterTitle>
        ⭐ 별점
      </FilterTitle>
      
      {starOptions.map((option) => (
        <StarOption
          key={option.value}
          className={stars.includes(option.value) ? 'selected' : ''}
        >
          <Checkbox
            type="checkbox"
            checked={stars.includes(option.value)}
            onChange={() => handleStarChange(option.value)}
          />
          <StarDisplay>
            {renderStars(option.value)}
          </StarDisplay>
          <StarLabel>{option.label}</StarLabel>
          <CountLabel>({option.count})</CountLabel>
        </StarOption>
      ))}
      
      <ClearButton onClick={clearFilter}>
        필터 초기화
      </ClearButton>
    </StarFilterContainer>
  );
};

export default StarFilter;

