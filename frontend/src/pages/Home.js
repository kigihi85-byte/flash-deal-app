import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Filter, X, Flame, Clock, Star, TrendingUp } from 'lucide-react';
import { useDeals } from '../context/DealContext';
import { useLanguage } from '../context/LanguageContext';
import DealCard from '../components/DealCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchSection = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const FilterPanel = styled(motion.div)`
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  flex: 1;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ClearButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #4b5563;
  }
`;

const ApplyButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #059669;
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const StatIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  
  ${props => props.color === 'blue' && `
    background: #dbeafe;
    color: #3b82f6;
  `}
  
  ${props => props.color === 'orange' && `
    background: #fed7aa;
    color: #f59e0b;
  `}
  
  ${props => props.color === 'green' && `
    background: #dcfce7;
    color: #16a34a;
  `}
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.875rem;
`;

const DealsSection = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #94a3b8;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const EmptyDescription = styled.p`
  color: #6b7280;
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
  const [localFilters, setLocalFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minDiscount: '',
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

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
    clearFilters();
    setShowFilters(false);
  };

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
          <HeroTitle>{t('flashDeals')}</HeroTitle>
          <HeroSubtitle>
            {t('amazingHotelDeals')} - {t('incrediblePrices')}. 
            {t('limitedTimeOffers')}!
          </HeroSubtitle>
        </HeroSection>

        <SearchSection>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearch}
            />
            <FilterButton onClick={() => setShowFilters(!showFilters)}>
              <Filter size={20} />
              {t('filterBy')}
            </FilterButton>
          </SearchContainer>

          {showFilters && (
            <FilterPanel
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FilterRow>
                <FilterGroup>
                  <FilterLabel>{t('minPrice')} (₩)</FilterLabel>
                  <FilterInput
                    type="number"
                    placeholder="0"
                    value={localFilters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                </FilterGroup>
                <FilterGroup>
                  <FilterLabel>{t('maxPrice')} (₩)</FilterLabel>
                  <FilterInput
                    type="number"
                    placeholder="1000000"
                    value={localFilters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </FilterGroup>
                <FilterGroup>
                  <FilterLabel>{t('minDiscount')} (%)</FilterLabel>
                  <FilterInput
                    type="number"
                    placeholder="0"
                    min="0"
                    max="99"
                    value={localFilters.minDiscount}
                    onChange={(e) => handleFilterChange('minDiscount', e.target.value)}
                  />
                </FilterGroup>
              </FilterRow>
              <FilterActions>
                <ClearButton onClick={handleClearFilters}>
                  {t('clear')}
                </ClearButton>
                <ApplyButton onClick={applyFilters}>
                  {t('applyFilters')}
                </ApplyButton>
              </FilterActions>
            </FilterPanel>
          )}
        </SearchSection>

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
              {t('activeDeals')}
            </SectionTitle>
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

          {!loading && !error && activeDeals.length === 0 && (
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

          {activeDeals.length > 0 && (
            <DealsGrid>
              {activeDeals.map((deal) => (
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
