import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Shield, CheckCircle, User, Mail, Phone, Calendar, MapPin, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dealService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const PaymentContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #374151;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background: #f3f4f6;
    transform: translateX(-2px);
  }
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentForm = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const BookingSummary = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const PaymentMethod = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PaymentOption = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  input[type="radio"] {
    display: none;
  }
  
  input[type="radio"]:checked + & {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
  
  &:hover {
    border-color: #3b82f6;
  }
`;

const PaymentIcon = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const PaymentLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const HotelInfo = styled.div`
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
`;

const HotelName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const BookingDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const DetailValue = styled.span`
  color: #1e293b;
  font-weight: 500;
  font-size: 0.875rem;
`;

const PriceBreakdown = styled.div`
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 0.5rem;
    border-top: 1px solid #e2e8f0;
    font-weight: 700;
    font-size: 1.125rem;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
`;

const PayButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecurityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #16a34a;
  font-size: 0.875rem;
  margin-top: 1rem;
  justify-content: center;
`;

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(price);
};

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setLoading(true);
        const response = await dealService.getDealById(id);
        setDeal(response.data);
        
        // Set default dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        setFormData(prev => ({
          ...prev,
          checkIn: today.toISOString().split('T')[0],
          checkOut: tomorrow.toISOString().split('T')[0]
        }));
      } catch (error) {
        toast.error(t('failedToLoadDeal'));
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, navigate, t]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      // TODO: Implement actual payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(t('paymentSuccess'));
      navigate('/');
    } catch (error) {
      toast.error(t('paymentError'));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (!deal) {
    return null;
  }

  const nights = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24));
  const subtotal = deal.discountedPrice * nights;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <PaymentContainer>
      <Container>
        <BackButton onClick={() => navigate(`/deal/${id}`)}>
          <ArrowLeft size={20} />
          {t('backToDeal')}
        </BackButton>

        <PaymentGrid>
          <PaymentForm
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title>{t('paymentDetails')}</Title>
            
            <form onSubmit={handleSubmit}>
              <Section>
                <SectionTitle>
                  <User size={20} />
                  {t('guestInformation')}
                </SectionTitle>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormGroup>
                    <Label>{t('firstName')}</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('lastName')}</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </div>
                
                <FormGroup>
                  <Label>{t('email')}</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>{t('phoneNumber')}</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Section>

              <Section>
                <SectionTitle>
                  <Calendar size={20} />
                  {t('bookingDetails')}
                </SectionTitle>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormGroup>
                    <Label>{t('checkIn')}</Label>
                    <Input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('checkOut')}</Label>
                    <Input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </div>
                
                <FormGroup>
                  <Label>{t('guests')}</Label>
                  <Select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {t('guests')}</option>
                    ))}
                  </Select>
                </FormGroup>
              </Section>

              <Section>
                <SectionTitle>
                  <CreditCard size={20} />
                  {t('paymentMethod')}
                </SectionTitle>
                
                <PaymentMethod>
                  <PaymentOption>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <PaymentIcon>
                      <CreditCard size={24} />
                    </PaymentIcon>
                    <PaymentLabel>{t('creditCard')}</PaymentLabel>
                  </PaymentOption>
                </PaymentMethod>
                
                {formData.paymentMethod === 'card' && (
                  <>
                    <FormGroup>
                      <Label>{t('cardNumber')}</Label>
                      <Input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </FormGroup>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <FormGroup>
                        <Label>{t('expiryDate')}</Label>
                        <Input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>{t('cvv')}</Label>
                        <Input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          required
                        />
                      </FormGroup>
                    </div>
                    
                    <FormGroup>
                      <Label>{t('cardholderName')}</Label>
                      <Input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </>
                )}
              </Section>

              <PayButton type="submit" disabled={processing}>
                {processing ? t('processing') : `${t('payNow')} ${formatPrice(total)}`}
              </PayButton>
              
              <SecurityInfo>
                <Shield size={16} />
                {t('securePayment')}
              </SecurityInfo>
            </form>
          </PaymentForm>

          <BookingSummary
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Title>{t('bookingSummary')}</Title>
            
            <HotelInfo>
              <HotelName>{deal.hotelName}</HotelName>
              <HotelLocation>
                <MapPin size={16} />
                {deal.location}
              </HotelLocation>
              <HotelRating>
                <Star size={16} fill="currentColor" />
                {deal.trustScore}/5
              </HotelRating>
            </HotelInfo>
            
            <BookingDetails>
              <DetailRow>
                <DetailLabel>{t('checkIn')}</DetailLabel>
                <DetailValue>{formData.checkIn}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>{t('checkOut')}</DetailLabel>
                <DetailValue>{formData.checkOut}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>{t('nights')}</DetailLabel>
                <DetailValue>{nights}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>{t('guests')}</DetailLabel>
                <DetailValue>{formData.guests}</DetailValue>
              </DetailRow>
            </BookingDetails>
            
            <PriceBreakdown>
              <PriceRow>
                <span>{formatPrice(deal.discountedPrice)} × {nights} {t('nights')}</span>
                <span>{formatPrice(subtotal)}</span>
              </PriceRow>
              <PriceRow>
                <span>{t('taxes')}</span>
                <span>{formatPrice(tax)}</span>
              </PriceRow>
              <PriceRow>
                <span>{t('total')}</span>
                <span>{formatPrice(total)}</span>
              </PriceRow>
            </PriceBreakdown>
            
            <TotalPrice>
              <span>{t('total')}</span>
              <span>{formatPrice(total)}</span>
            </TotalPrice>
          </BookingSummary>
        </PaymentGrid>
      </Container>
    </PaymentContainer>
  );
};

export default Payment;
