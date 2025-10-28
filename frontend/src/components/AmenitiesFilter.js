import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Wifi, 
  Car, 
  Waves, 
  Dumbbell, 
  UtensilsCrossed, 
  Coffee,
  Heart,
  Baby,
  Plane,
  Shield
} from 'lucide-react';

const AmenitiesFilterContainer = styled.div`
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

const AmenityOption = styled.label`
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const AmenityLabel = styled.span`
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

const AmenitiesFilter = ({ onAmenitiesChange, selectedAmenities = [] }) => {
  const [amenities, setAmenities] = useState(selectedAmenities);

  const amenityOptions = [
    { value: 'wifi', label: '무료 WiFi', icon: Wifi, count: 156 },
    { value: 'parking', label: '주차장', icon: Car, count: 134 },
    { value: 'pool', label: '수영장', icon: Waves, count: 89 },
    { value: 'gym', label: '피트니스', icon: Dumbbell, count: 67 },
    { value: 'restaurant', label: '레스토랑', icon: UtensilsCrossed, count: 123 },
    { value: 'cafe', label: '카페', icon: Coffee, count: 98 },
    { value: 'pet', label: '펫 동반', icon: Heart, count: 45 },
    { value: 'family', label: '가족 친화적', icon: Baby, count: 78 },
    { value: 'airport', label: '공항 셔틀', icon: Plane, count: 56 },
    { value: 'security', label: '24시간 보안', icon: Shield, count: 112 },
  ];

  const handleAmenityChange = (amenityValue) => {
    const newAmenities = amenities.includes(amenityValue)
      ? amenities.filter(a => a !== amenityValue)
      : [...amenities, amenityValue];
    
    setAmenities(newAmenities);
    onAmenitiesChange(newAmenities);
  };

  const clearFilter = () => {
    setAmenities([]);
    onAmenitiesChange([]);
  };

  return (
    <AmenitiesFilterContainer>
      <FilterTitle>
        🏨 편의시설
      </FilterTitle>
      
      {amenityOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <AmenityOption
            key={option.value}
            className={amenities.includes(option.value) ? 'selected' : ''}
          >
            <Checkbox
              type="checkbox"
              checked={amenities.includes(option.value)}
              onChange={() => handleAmenityChange(option.value)}
            />
            <IconWrapper>
              <IconComponent size={16} />
            </IconWrapper>
            <AmenityLabel>{option.label}</AmenityLabel>
            <CountLabel>({option.count})</CountLabel>
          </AmenityOption>
        );
      })}
      
      <ClearButton onClick={clearFilter}>
        필터 초기화
      </ClearButton>
    </AmenitiesFilterContainer>
  );
};

export default AmenitiesFilter;
