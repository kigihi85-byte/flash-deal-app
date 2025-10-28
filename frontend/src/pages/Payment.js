import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, Calendar, Users, Shield, Check, ArrowLeft, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { dealService } from '../services/api';
import toast from 'react-hot-toast';

const PaymentContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentForm = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const BookingSummary = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  height: fit-content;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
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

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #ffffff;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const HotelCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const HotelImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const HotelName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const BookingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const DetailValue = styled.span`
  color: #1f2937;
  font-weight: 500;
`;

const PriceBreakdown = styled.div`
  margin-top: 1.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  
  &.total {
    border-top: 1px solid #e5e7eb;
    margin-top: 1rem;
    padding-top: 1rem;
    font-weight: 700;
    font-size: 1.125rem;
    color: #dc2626;
  }
`;

const PaymentButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1.5rem;
  
  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecurityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: user?.email || '',
    phone: '',
    specialRequests: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchDealDetails();
  }, [id]);

  const fetchDealDetails = async () => {
    try {
      setLoading(true);
      const response = await dealService.getDealById(id);
      setDeal(response.data);
    } catch (error) {
      console.error('Failed to fetch deal details:', error);
      toast.error('딜 정보를 불러오는데 실패했습니다.');
      setDeal(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 실제 결제 API 호출
      await dealService.bookRoom(id);
      toast.success('결제가 완료되었습니다!');
      navigate('/booking-success');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('결제 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <PaymentContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <Clock size={48} className="animate-spin" />
            <p>딜 정보를 불러오는 중...</p>
          </div>
        </Container>
      </PaymentContainer>
    );
  }

  if (!deal) {
    return (
      <PaymentContainer>
        <Container>
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              딜을 찾을 수 없습니다
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              요청하신 딜을 찾을 수 없습니다.
            </p>
            <BackButton onClick={() => navigate('/')}>
              <ArrowLeft size={16} />
              홈으로 돌아가기
            </BackButton>
          </div>
        </Container>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          이전 페이지로
        </BackButton>

        <PaymentGrid>
          <PaymentForm>
            <SectionTitle>
              <CreditCard size={24} />
              결제 정보
            </SectionTitle>

            <FormGroup>
              <FormLabel>카드 번호</FormLabel>
              <FormInput
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel>만료일</FormLabel>
                <FormInput
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>CVV</FormLabel>
                <FormInput
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="3"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel>카드 소유자명</FormLabel>
              <FormInput
                type="text"
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handleInputChange}
                placeholder="홍길동"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={paymentData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>연락처</FormLabel>
              <FormInput
                type="tel"
                name="phone"
                value={paymentData.phone}
                onChange={handleInputChange}
                placeholder="010-1234-5678"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>특별 요청사항</FormLabel>
              <FormInput
                type="text"
                name="specialRequests"
                value={paymentData.specialRequests}
                onChange={handleInputChange}
                placeholder="특별 요청사항이 있으시면 입력해주세요"
              />
            </FormGroup>

            <PaymentButton 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? '결제 처리 중...' : `${formatPrice(deal.discountedPrice)} 결제하기`}
            </PaymentButton>

            <SecurityInfo>
              <Shield size={16} />
              SSL 보안 연결로 안전하게 결제됩니다
            </SecurityInfo>
          </PaymentForm>

          <BookingSummary>
            <SectionTitle>
              <Check size={24} />
              예약 요약
            </SectionTitle>

            <HotelCard>
              <HotelImage
                src={deal.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
                alt={deal.hotelName}
              />
              <HotelName>{deal.hotelName}</HotelName>
              <HotelLocation>
                <MapPin size={16} />
                {deal.location}
              </HotelLocation>
            </HotelCard>

            <BookingDetails>
              <DetailLabel>체크인</DetailLabel>
              <DetailValue>2024년 1월 15일</DetailValue>
            </BookingDetails>

            <BookingDetails>
              <DetailLabel>체크아웃</DetailLabel>
              <DetailValue>2024년 1월 17일</DetailValue>
            </BookingDetails>

            <BookingDetails>
              <DetailLabel>숙박일수</DetailLabel>
              <DetailValue>2박 3일</DetailValue>
            </BookingDetails>

            <BookingDetails>
              <DetailLabel>객실 수</DetailLabel>
              <DetailValue>1개</DetailValue>
            </BookingDetails>

            <BookingDetails>
              <DetailLabel>인원</DetailLabel>
              <DetailValue>성인 2명</DetailValue>
            </BookingDetails>

            <PriceBreakdown>
              <PriceRow>
                <span>객실 요금 (2박)</span>
                <span>{formatPrice(deal.originalPrice)}</span>
              </PriceRow>
              <PriceRow>
                <span>할인 (-{deal.discountPercentage}%)</span>
                <span>-{formatPrice(deal.originalPrice - deal.discountedPrice)}</span>
              </PriceRow>
              <PriceRow>
                <span>세금 및 수수료</span>
                <span>{formatPrice(deal.discountedPrice * 0.1)}</span>
              </PriceRow>
              <PriceRow className="total">
                <span>총 결제 금액</span>
                <span>{formatPrice(deal.discountedPrice * 1.1)}</span>
              </PriceRow>
            </PriceBreakdown>
          </BookingSummary>
        </PaymentGrid>
      </Container>
    </PaymentContainer>
  );
};

export default Payment;