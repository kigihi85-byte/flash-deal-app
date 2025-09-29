import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Filter, X, MapPin, Calendar, Users } from 'lucide-react';
import { useDeals } from '../context/DealContext';
import { useLanguage } from '../context/LanguageContext';
import DealCard from '../components/DealCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CountryFilter from '../components/CountryFilter';
import DatePicker from '../components/DatePicker';
import PriceFilter from '../components/PriceFilter';
import StarFilter from '../components/StarFilter';
import AmenitiesFilter from '../components/AmenitiesFilter';
import { dealService } from '../services/api';

const SearchPageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 70px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SearchHeader = styled.div`
  background: white;
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`;

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SearchLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const SearchButton = styled.button`
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
`;

const FilterButton = styled.button`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 90px;
  height: fit-content;
`;

const ResultsSection = styled.div`
  min-height: 400px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ResultsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
`;

const ResultsCount = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
`;

const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const NoResultsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const NoResultsText = styled.p`
  font-size: 0.875rem;
`;

const FilterPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const FilterContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  
  &:hover {
    color: #374151;
  }
`;

const SearchPage = () => {
  const { deals, loading, searchDeals } = useDeals();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredDeals, setFilteredDeals] = useState([]);

  useEffect(() => {
    // Initial load
    searchDeals('');
  }, []);

  useEffect(() => {
    // Apply filters when any filter changes
    applyFilters();
  }, [applyFilters]);

  const applyFilters = useCallback(() => {
    let filtered = [...deals];

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(deal => 
        deal.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Country filter
    if (selectedCountry) {
      filtered = filtered.filter(deal => 
        deal.country === selectedCountry
      );
    }

    // City filter
    if (selectedCity) {
      filtered = filtered.filter(deal => 
        deal.city === selectedCity
      );
    }

    // Price range filter
    filtered = filtered.filter(deal => 
      deal.discountedPrice >= priceRange[0] && deal.discountedPrice <= priceRange[1]
    );

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.trustScore || 0) - (a.trustScore || 0));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredDeals(filtered);
  }, [deals, searchQuery, selectedCountry, selectedCity, priceRange, selectedStars, selectedAmenities, sortBy]);

  const handleSearch = () => {
    applyFilters();
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };

  const handleStarChange = (stars) => {
    setSelectedStars(stars);
  };

  const handleAmenitiesChange = (amenities) => {
    setSelectedAmenities(amenities);
  };

  return (
    <SearchPageContainer>
      <Container>
        <SearchHeader>
          <SearchForm>
            <SearchField>
              <SearchLabel>어디로 가시나요?</SearchLabel>
              <SearchInput
                type="text"
                placeholder="도시, 호텔명, 지역을 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchField>
            
            <SearchField>
              <SearchLabel>체크인</SearchLabel>
              <SearchInput
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </SearchField>
            
            <SearchField>
              <SearchLabel>체크아웃</SearchLabel>
              <SearchInput
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </SearchField>
            
            <SearchField>
              <SearchLabel>인원</SearchLabel>
              <SearchInput
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </SearchField>
            
            <SearchButton onClick={handleSearch}>
              <Search size={16} />
              검색
            </SearchButton>
          </SearchForm>
        </SearchHeader>

        <MainContent>
          <Sidebar>
            <FilterButton 
              onClick={() => setShowMobileFilters(true)}
              style={{ display: 'none' }}
            >
              <Filter size={16} />
              필터
            </FilterButton>
            
            <PriceFilter 
              onPriceChange={handlePriceChange}
              minPrice={0}
              maxPrice={1000000}
            />
            
            <StarFilter 
              onStarChange={handleStarChange}
              selectedStars={selectedStars}
            />
            
            <AmenitiesFilter 
              onAmenitiesChange={handleAmenitiesChange}
              selectedAmenities={selectedAmenities}
            />
          </Sidebar>

          <ResultsSection>
            <ResultsHeader>
              <div>
                <ResultsTitle>검색 결과</ResultsTitle>
                <ResultsCount>{filteredDeals.length}개의 숙소</ResultsCount>
              </div>
              
              <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="relevance">관련도순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="discount">할인율순</option>
                <option value="rating">평점순</option>
              </SortSelect>
            </ResultsHeader>

            {loading ? (
              <LoadingSpinner />
            ) : filteredDeals.length > 0 ? (
              <ResultsGrid>
                {filteredDeals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DealCard deal={deal} />
                  </motion.div>
                ))}
              </ResultsGrid>
            ) : (
              <NoResults>
                <NoResultsIcon>🔍</NoResultsIcon>
                <NoResultsTitle>검색 결과가 없습니다</NoResultsTitle>
                <NoResultsText>
                  다른 검색어나 필터를 시도해보세요
                </NoResultsText>
              </NoResults>
            )}
          </ResultsSection>
        </MainContent>

        {showMobileFilters && (
          <FilterPanel onClick={() => setShowMobileFilters(false)}>
            <FilterContent onClick={(e) => e.stopPropagation()}>
              <FilterHeader>
                <FilterTitle>필터</FilterTitle>
                <CloseButton onClick={() => setShowMobileFilters(false)}>
                  <X size={20} />
                </CloseButton>
              </FilterHeader>
              
              <PriceFilter 
                onPriceChange={handlePriceChange}
                minPrice={0}
                maxPrice={1000000}
              />
              
              <StarFilter 
                onStarChange={handleStarChange}
                selectedStars={selectedStars}
              />
              
              <AmenitiesFilter 
                onAmenitiesChange={handleAmenitiesChange}
                selectedAmenities={selectedAmenities}
              />
            </FilterContent>
          </FilterPanel>
        )}
      </Container>
    </SearchPageContainer>
  );
};

export default SearchPage;
