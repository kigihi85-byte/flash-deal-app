import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const FilterSelect = styled.div`
  position: relative;
  min-width: 150px;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #dc2626;
  }
  
  &.active {
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.05);
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  font-size: 0.875rem;
  
  &:hover {
    background: #f8fafc;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
  }
`;

const CountryFilter = ({ onCountryChange, onCityChange, selectedCountry, selectedCity }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchCities(selectedCountry);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/deals/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  const fetchCities = async (country) => {
    try {
      const response = await fetch(`/deals/country/${encodeURIComponent(country)}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const handleCountrySelect = (country) => {
    onCountryChange(country);
    onCityChange(null); // Reset city when country changes
    setIsCountryOpen(false);
  };

  const handleCitySelect = (city) => {
    onCityChange(city);
    setIsCityOpen(false);
  };

  const handleClearFilters = () => {
    onCountryChange(null);
    onCityChange(null);
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>{t('country')}</FilterLabel>
        <FilterSelect>
          <SelectButton
            className={selectedCountry ? 'active' : ''}
            onClick={() => setIsCountryOpen(!isCountryOpen)}
          >
            <span>{selectedCountry || t('selectCountry')}</span>
            <ChevronDown size={16} />
          </SelectButton>
          {isCountryOpen && (
            <Dropdown
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {countries.map((country) => (
                <DropdownItem
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                >
                  <Globe size={16} style={{ marginRight: '0.5rem' }} />
                  {country}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </FilterSelect>
      </FilterGroup>

      {selectedCountry && (
        <FilterGroup>
          <FilterLabel>{t('city')}</FilterLabel>
          <FilterSelect>
            <SelectButton
              className={selectedCity ? 'active' : ''}
              onClick={() => setIsCityOpen(!isCityOpen)}
            >
              <span>{selectedCity || t('selectCity')}</span>
              <ChevronDown size={16} />
            </SelectButton>
            {isCityOpen && (
              <Dropdown
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {cities.map((city) => (
                  <DropdownItem
                    key={city}
                    onClick={() => handleCitySelect(city)}
                  >
                    <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                    {city}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </FilterSelect>
        </FilterGroup>
      )}

      {(selectedCountry || selectedCity) && (
        <FilterGroup>
          <FilterLabel>&nbsp;</FilterLabel>
          <ClearButton onClick={handleClearFilters}>
            {t('clearFilters')}
          </ClearButton>
        </FilterGroup>
      )}
    </FilterContainer>
  );
};

export default CountryFilter;
