import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Filter, X, Flame, Clock, TrendingUp } from 'lucide-react';
import { useDeals } from '../context/DealContext';
import { useLanguage } from '../context/LanguageContext';
import DealCard from '../components/DealCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CountryFilter from '../components/CountryFilter';
import DatePicker from '../components/DatePicker';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 70px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  position: relative;
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
              url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=500&fit=crop') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchSection = styled.section`
  position: relative;
  margin-top: -100px;
  z-index: 10;
  margin-bottom: 3rem;
`;

const SearchWidget = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  max-width: 1000px;
  margin: 0 auto;
`;

const SearchTabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const SearchTab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: ${props => props.active ? '#dc2626' : '#6b7280'};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#dc2626' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: #dc2626;
  }
`;

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const SearchInput = styled.input`
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const DateInput = styled.input`
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const GuestInput = styled.div`
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #dc2626;
  }
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
  }
`;

const FlightOption = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const FlightLink = styled.a`
  color: #dc2626;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterPanel = styled(motion.div)`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const FilterInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ClearButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
`;

const ApplyButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #dc2626;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #b91c1c;
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const StatIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${props => {
    switch(props.color) {
      case 'blue': return '#dbeafe';
      case 'orange': return '#fed7aa';
      case 'green': return '#dcfce7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch(props.color) {
      case 'blue': return '#2563eb';
      case 'orange': return '#ea580c';
      case 'green': return '#16a34a';
      default: return '#6b7280';
    }
  }};
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const DealsSection = styled.section`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
`;

const FilterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  color: #6b7280;
  font-size: 0.875rem;
`;

const ClearFilterButton = styled.button`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`;

const EmptyIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #f3f4f6;
  color: #9ca3af;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  color: #6b7280;
`;

const DestinationsSection = styled.section`
  margin-bottom: 3rem;
`;

const DestinationsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const DestinationCard = styled.div`
  position: relative;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const DestinationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DestinationOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  color: white;
`;

const DestinationName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const Home = () => {
  const {
    activeDeals,
    upcomingDeals,
    loading,
    error,
    searchQuery,
    filters,
    searchDeals,
    filterDealsByPrice,
    filterDealsByDiscount,
    clearFilters,
  } = useDeals();

  const { t } = useLanguage();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [localFilters, setLocalFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minDiscount: '',
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Added useEffect for country/city filtering
  useEffect(() => {
    fetchFilteredDeals();
  }, [selectedCountry, selectedCity]);

  const fetchFilteredDeals = async () => {
    try {
      let url = '/deals/active';

      if (selectedCountry && selectedCity) {
        url = `/deals/country/${encodeURIComponent(selectedCountry)}/city/${encodeURIComponent(selectedCity)}`;
      } else if (selectedCountry) {
        url = `/deals/country/${encodeURIComponent(selectedCountry)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setFilteredDeals(data);
    } catch (error) {
      console.error('Failed to fetch filtered deals:', error);
      // API 호출 실패 시 클라이언트 사이드 필터링으로 대체
      let filtered = [...activeDeals];
      
      if (selectedCountry) {
        filtered = filtered.filter(deal => deal.country === selectedCountry);
      }
      
      if (selectedCity) {
        filtered = filtered.filter(deal => deal.city === selectedCity);
      }
      
      setFilteredDeals(filtered);
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const handleClearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleSearch = (e) => {
    searchDeals(e.target.value);
  };

  const handleFilterChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    if (localFilters.minPrice || localFilters.maxPrice) {
      const minPrice = localFilters.minPrice ? parseFloat(localFilters.minPrice) : 0;
      const maxPrice = localFilters.maxPrice ? parseFloat(localFilters.maxPrice) : 1000000;
      filterDealsByPrice(minPrice, maxPrice);
    }

    if (localFilters.minDiscount) {
      filterDealsByDiscount(parseInt(localFilters.minDiscount));
    }

    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      minPrice: '',
      maxPrice: '',
      minDiscount: '',
    });
    setSelectedCountry(null);
    setSelectedCity(null);
    setCheckInDate(null);
    setCheckOutDate(null);
    clearFilters();
    setShowFilters(false);
  };

  const displayDeals = filteredDeals.length > 0 ? filteredDeals : activeDeals;

  const totalSavings = activeDeals.reduce((sum, deal) => {
    return sum + (deal.originalPrice - deal.discountedPrice);
  }, 0);

  const averageDiscount = activeDeals.length > 0
    ? Math.round(activeDeals.reduce((sum, deal) => sum + deal.discountPercentage, 0) / activeDeals.length)
    : 0;

  if (loading && activeDeals.length === 0) {
    return <LoadingSpinner text={t('loading')} />;
  }

  return (
    <HomeContainer>
      <Container>
        <HeroSection>
          <HeroContent>
            <HeroTitle>{t('flashDeals')}</HeroTitle>
            <HeroSubtitle>
              {t('amazingHotelDeals')} - {t('incrediblePrices')}.
              {t('limitedTimeOffers')}!
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <SearchSection>
          <SearchWidget>
            <SearchTabs>
              <SearchTab active>숙박</SearchTab>
              <SearchTab>대실</SearchTab>
            </SearchTabs>
            
            <SearchForm>
              <SearchField>
                <FieldLabel>어디로 떠나시나요?</FieldLabel>
                <SearchInput
                  type="text"
                  placeholder="도시, 호텔명, 지역을 입력하세요"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </SearchField>
              
              <SearchField>
                <FieldLabel>체크인</FieldLabel>
                <DateInput
                  type="date"
                  value={checkInDate ? checkInDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleCheckInChange(e.target.value ? new Date(e.target.value) : null)}
                />
              </SearchField>
              
              <SearchField>
                <FieldLabel>체크아웃</FieldLabel>
                <DateInput
                  type="date"
                  value={checkOutDate ? checkOutDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleCheckOutChange(e.target.value ? new Date(e.target.value) : null)}
                />
              </SearchField>
              
              <SearchField>
                <FieldLabel>인원</FieldLabel>
                <GuestInput>
                  성인 2명 객실 1개
                </GuestInput>
              </SearchField>
              
              <SearchButton onClick={() => {
                const params = new URLSearchParams();
                if (searchQuery) params.append('q', searchQuery);
                if (checkInDate) params.append('checkin', checkInDate.toISOString().split('T')[0]);
                if (checkOutDate) params.append('checkout', checkOutDate.toISOString().split('T')[0]);
                window.location.href = `/search?${params.toString()}`;
              }}>
                검색하기
              </SearchButton>
            </SearchForm>
            
            <FlightOption>
              <FlightLink href="#">+ 항공편도 예약하기</FlightLink>
            </FlightOption>
          </SearchWidget>
        </SearchSection>

        <DestinationsSection>
          <DestinationsTitle>인기 여행지</DestinationsTitle>
          <DestinationsGrid>
            <DestinationCard onClick={() => {
              setSelectedCountry('South Korea');
              setSelectedCity('Seoul');
            }}>
              <DestinationImage src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=150&fit=crop" alt="서울" />
              <DestinationOverlay>
                <DestinationName>서울</DestinationName>
              </DestinationOverlay>
            </DestinationCard>
            <DestinationCard onClick={() => {
              setSelectedCountry('South Korea');
              setSelectedCity('Busan');
            }}>
              <DestinationImage src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=150&fit=crop" alt="부산" />
              <DestinationOverlay>
                <DestinationName>부산</DestinationName>
              </DestinationOverlay>
            </DestinationCard>
            <DestinationCard onClick={() => {
              setSelectedCountry('South Korea');
              setSelectedCity('Jeju');
            }}>
              <DestinationImage src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=150&fit=crop" alt="제주도" />
              <DestinationOverlay>
                <DestinationName>제주도</DestinationName>
              </DestinationOverlay>
            </DestinationCard>
            <DestinationCard onClick={() => {
              setSelectedCountry('Japan');
              setSelectedCity('Tokyo');
            }}>
              <DestinationImage src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=150&fit=crop" alt="도쿄" />
              <DestinationOverlay>
                <DestinationName>도쿄</DestinationName>
              </DestinationOverlay>
            </DestinationCard>
            <DestinationCard onClick={() => {
              setSelectedCountry('Thailand');
              setSelectedCity('Bangkok');
            }}>
              <DestinationImage src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=150&fit=crop" alt="방콕" />
              <DestinationOverlay>
                <DestinationName>방콕</DestinationName>
              </DestinationOverlay>
            </DestinationCard>
          </DestinationsGrid>
        </DestinationsSection>

        <StatsSection>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatIcon color="blue">
              <Flame size={24} />
            </StatIcon>
            <StatValue>{activeDeals.length}</StatValue>
            <StatLabel>{t('activeDealsCount')}</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatIcon color="orange">
              <Clock size={24} />
            </StatIcon>
            <StatValue>{upcomingDeals.length}</StatValue>
            <StatLabel>{t('upcomingDealsCount')}</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatIcon color="green">
              <TrendingUp size={24} />
            </StatIcon>
            <StatValue>{averageDiscount}%</StatValue>
            <StatLabel>{t('averageDiscount')}</StatLabel>
          </StatCard>
        </StatsSection>

        <DealsSection>
          <SectionHeader>
            <SectionTitle>
              <Flame size={24} />
              {selectedCountry && selectedCity 
                ? `${selectedCity} 딜` 
                : selectedCountry 
                ? `${selectedCountry} 딜` 
                : t('activeDeals')}
            </SectionTitle>
            {(selectedCountry || selectedCity) && (
              <FilterInfo>
                <span>
                  필터: {selectedCountry} {selectedCity && `- ${selectedCity}`}
                </span>
                <ClearFilterButton onClick={() => {
                  setSelectedCountry(null);
                  setSelectedCity(null);
                }}>
                  필터 지우기
                </ClearFilterButton>
              </FilterInfo>
            )}
          </SectionHeader>

          {error && (
            <EmptyState>
              <EmptyIcon>
                <X size={32} />
              </EmptyIcon>
              <EmptyTitle>{t('errorLoadingDeals')}</EmptyTitle>
              <EmptyDescription>{error}</EmptyDescription>
            </EmptyState>
          )}

          {!loading && !error && displayDeals.length === 0 && (
            <EmptyState>
              <EmptyIcon>
                <Search size={32} />
              </EmptyIcon>
              <EmptyTitle>{t('noDealsFound')}</EmptyTitle>
              <EmptyDescription>
                {t('tryAdjustingSearch')}
              </EmptyDescription>
            </EmptyState>
          )}

          {displayDeals.length > 0 && (
            <DealsGrid>
              {displayDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </DealsGrid>
          )}

          {loading && activeDeals.length > 0 && (
            <LoadingSpinner text={t('loadingMoreDeals')} />
          )}
        </DealsSection>
      </Container>
    </HomeContainer>
  );
};

export default Home;