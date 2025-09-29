import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CalendarDays, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { format, addDays, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';

const DatePickerContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const DateGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
`;

const DateLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const DateInput = styled.div`
  position: relative;
`;

const DateButton = styled.button`
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
  
  &.error {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
  }
`;

const DateText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CalendarDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
  min-width: 300px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MonthYear = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: #f8fafc;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e2e8f0;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const DayHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
`;

const DayButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
  }
  
  &.selected {
    background: #dc2626;
    color: white;
  }
  
  &.in-range {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
  
  &.disabled {
    color: #d1d5db;
    cursor: not-allowed;
    
    &:hover {
      background: none;
    }
  }
  
  &.today {
    font-weight: 600;
    color: #dc2626;
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

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
`;

const DatePicker = ({ 
  checkInDate, 
  checkOutDate, 
  onCheckInChange, 
  onCheckOutChange, 
  onClearDates 
}) => {
  const { t, language } = useLanguage();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [error, setError] = useState('');

  const locale = language === 'ko' ? ko : enUS;

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      if (isAfter(checkInDate, checkOutDate)) {
        setError(t('checkInAfterCheckOut'));
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  }, [checkInDate, checkOutDate, t]);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 365); // 1년 후까지

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 빈 칸들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 실제 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    return isBefore(date, today) || isAfter(date, maxDate);
  };

  const isDateInRange = (date) => {
    if (!checkInDate || !checkOutDate) return false;
    return isAfter(date, checkInDate) && isBefore(date, checkOutDate);
  };

  const isDateSelected = (date, type) => {
    if (type === 'checkin') {
      return checkInDate && isSameDay(date, checkInDate);
    }
    if (type === 'checkout') {
      return checkOutDate && isSameDay(date, checkOutDate);
    }
    return false;
  };

  const handleDateClick = (date, type) => {
    if (isDateDisabled(date)) return;

    if (type === 'checkin') {
      onCheckInChange(date);
      setIsCheckInOpen(false);
      
      // 체크인 날짜가 체크아웃 날짜보다 늦으면 체크아웃 날짜를 다음날로 설정
      if (checkOutDate && isAfter(date, checkOutDate)) {
        onCheckOutChange(addDays(date, 1));
      }
    } else if (type === 'checkout') {
      onCheckOutChange(date);
      setIsCheckOutOpen(false);
    }
  };

  const handleClearDates = () => {
    onCheckInChange(null);
    onCheckOutChange(null);
    setError('');
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const dayNames = language === 'ko' 
    ? ['일', '월', '화', '수', '목', '금', '토']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <DatePickerContainer>
      <DateGroup>
        <DateLabel>{t('checkIn')}</DateLabel>
        <DateInput>
          <DateButton
            className={`${checkInDate ? 'active' : ''} ${error ? 'error' : ''}`}
            onClick={() => {
              setIsCheckInOpen(!isCheckInOpen);
              setIsCheckOutOpen(false);
            }}
          >
            <DateText>
              <Calendar size={16} />
              {checkInDate ? format(checkInDate, 'yyyy-MM-dd', { locale }) : t('selectDate')}
            </DateText>
          </DateButton>
          
          <AnimatePresence>
            {isCheckInOpen && (
              <CalendarDropdown
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CalendarHeader>
                  <NavButton onClick={() => navigateMonth(-1)}>‹</NavButton>
                  <MonthYear>
                    {format(currentMonth, 'yyyy년 M월', { locale })}
                  </MonthYear>
                  <NavButton onClick={() => navigateMonth(1)}>›</NavButton>
                </CalendarHeader>
                
                <CalendarGrid>
                  {dayNames.map(day => (
                    <DayHeader key={day}>{day}</DayHeader>
                  ))}
                  {days.map((day, index) => (
                    <DayButton
                      key={index}
                      className={`
                        ${day ? '' : 'disabled'}
                        ${day && isDateDisabled(day) ? 'disabled' : ''}
                        ${day && isSameDay(day, today) ? 'today' : ''}
                        ${day && isDateSelected(day, 'checkin') ? 'selected' : ''}
                        ${day && isDateInRange(day) ? 'in-range' : ''}
                      `}
                      onClick={() => day && handleDateClick(day, 'checkin')}
                      disabled={!day || isDateDisabled(day)}
                    >
                      {day ? day.getDate() : ''}
                    </DayButton>
                  ))}
                </CalendarGrid>
              </CalendarDropdown>
            )}
          </AnimatePresence>
        </DateInput>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DateGroup>

      <DateGroup>
        <DateLabel>{t('checkOut')}</DateLabel>
        <DateInput>
          <DateButton
            className={`${checkOutDate ? 'active' : ''} ${error ? 'error' : ''}`}
            onClick={() => {
              setIsCheckOutOpen(!isCheckOutOpen);
              setIsCheckInOpen(false);
            }}
          >
            <DateText>
              <CalendarDays size={16} />
              {checkOutDate ? format(checkOutDate, 'yyyy-MM-dd', { locale }) : t('selectDate')}
            </DateText>
          </DateButton>
          
          <AnimatePresence>
            {isCheckOutOpen && (
              <CalendarDropdown
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CalendarHeader>
                  <NavButton onClick={() => navigateMonth(-1)}>‹</NavButton>
                  <MonthYear>
                    {format(currentMonth, 'yyyy년 M월', { locale })}
                  </MonthYear>
                  <NavButton onClick={() => navigateMonth(1)}>›</NavButton>
                </CalendarHeader>
                
                <CalendarGrid>
                  {dayNames.map(day => (
                    <DayHeader key={day}>{day}</DayHeader>
                  ))}
                  {days.map((day, index) => (
                    <DayButton
                      key={index}
                      className={`
                        ${day ? '' : 'disabled'}
                        ${day && isDateDisabled(day) ? 'disabled' : ''}
                        ${day && isSameDay(day, today) ? 'today' : ''}
                        ${day && isDateSelected(day, 'checkout') ? 'selected' : ''}
                        ${day && isDateInRange(day) ? 'in-range' : ''}
                      `}
                      onClick={() => day && handleDateClick(day, 'checkout')}
                      disabled={!day || isDateDisabled(day)}
                    >
                      {day ? day.getDate() : ''}
                    </DayButton>
                  ))}
                </CalendarGrid>
              </CalendarDropdown>
            )}
          </AnimatePresence>
        </DateInput>
      </DateGroup>

      {(checkInDate || checkOutDate) && (
        <DateGroup>
          <DateLabel>&nbsp;</DateLabel>
          <ClearButton onClick={handleClearDates}>
            <X size={16} />
            {t('clearDates')}
          </ClearButton>
        </DateGroup>
      )}
    </DatePickerContainer>
  );
};

export default DatePicker;
