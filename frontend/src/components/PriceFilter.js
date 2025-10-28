import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Slider } from 'antd';

const PriceFilterContainer = styled.div`
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

const PriceRange = styled.div`
  margin-bottom: 1rem;
`;

const PriceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PriceInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const PriceLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const SliderContainer = styled.div`
  margin: 1rem 0;
`;

const PricePresets = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PresetButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
  
  &.active {
    background: #dc2626;
    color: white;
    border-color: #dc2626;
  }
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

const PriceFilter = ({ onPriceChange, minPrice = 0, maxPrice = 1000000 }) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [inputMin, setInputMin] = useState(minPrice);
  const [inputMax, setInputMax] = useState(maxPrice);

  const pricePresets = [
    { label: '5만원 이하', min: 0, max: 50000 },
    { label: '5-10만원', min: 50000, max: 100000 },
    { label: '10-20만원', min: 100000, max: 200000 },
    { label: '20-50만원', min: 200000, max: 500000 },
    { label: '50만원 이상', min: 500000, max: maxPrice },
  ];

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setInputMin(minPrice);
    setInputMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (value) => {
    setPriceRange(value);
    setInputMin(value[0]);
    setInputMax(value[1]);
    onPriceChange(value[0], value[1]);
  };

  const handleInputChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    
    if (type === 'min') {
      const newMin = Math.min(numValue, priceRange[1]);
      setInputMin(newMin);
      setPriceRange([newMin, priceRange[1]]);
      onPriceChange(newMin, priceRange[1]);
    } else {
      const newMax = Math.max(numValue, priceRange[0]);
      setInputMax(newMax);
      setPriceRange([priceRange[0], newMax]);
      onPriceChange(priceRange[0], newMax);
    }
  };

  const handlePresetClick = (preset) => {
    setPriceRange([preset.min, preset.max]);
    setInputMin(preset.min);
    setInputMax(preset.max);
    onPriceChange(preset.min, preset.max);
  };

  const clearFilter = () => {
    setPriceRange([minPrice, maxPrice]);
    setInputMin(minPrice);
    setInputMax(maxPrice);
    onPriceChange(minPrice, maxPrice);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <PriceFilterContainer>
      <FilterTitle>
        💰 가격대
      </FilterTitle>
      
      <PriceRange>
        <PriceDisplay>
          <div>
            <PriceInput
              type="number"
              value={formatPrice(inputMin)}
              onChange={(e) => handleInputChange('min', e.target.value.replace(/,/g, ''))}
              placeholder="최소"
            />
            <PriceLabel>원</PriceLabel>
          </div>
          <span style={{ color: '#6b7280' }}>~</span>
          <div>
            <PriceInput
              type="number"
              value={formatPrice(inputMax)}
              onChange={(e) => handleInputChange('max', e.target.value.replace(/,/g, ''))}
              placeholder="최대"
            />
            <PriceLabel>원</PriceLabel>
          </div>
        </PriceDisplay>
        
        <SliderContainer>
          <Slider
            range
            min={minPrice}
            max={maxPrice}
            step={10000}
            value={priceRange}
            onChange={handleSliderChange}
            tooltip={{
              formatter: (value) => `${formatPrice(value)}원`,
            }}
            styles={{
              track: {
                backgroundColor: '#dc2626',
              },
              handle: {
                borderColor: '#dc2626',
              },
            }}
          />
        </SliderContainer>
      </PriceRange>
      
      <PricePresets>
        {pricePresets.map((preset, index) => (
          <PresetButton
            key={index}
            onClick={() => handlePresetClick(preset)}
            className={
              priceRange[0] === preset.min && priceRange[1] === preset.max
                ? 'active'
                : ''
            }
          >
            {preset.label}
          </PresetButton>
        ))}
      </PricePresets>
      
      <ClearButton onClick={clearFilter}>
        필터 초기화
      </ClearButton>
    </PriceFilterContainer>
  );
};

export default PriceFilter;

