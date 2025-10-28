import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, CreditCard, Download, Home, User, Star, MessageCircle } from 'lucide-react';
import { downloadReceipt } from '../utils/pdfGenerator';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import toast from 'react-hot-toast';

const SuccessContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SuccessCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const SuccessSubtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const BookingDetails = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const DetailRow = styled.div`
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
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailValue = styled.span`
  color: #1f2937;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: #dc2626;
    color: white;
    
    &:hover {
      background: #b91c1c;
      transform: translateY(-1px);
    }
  }
  
  &.secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #e5e7eb;
    }
  }
`;

const ReviewSection = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ReviewHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ReviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ReviewSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const ReviewToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 auto;
  
  &:hover {
    background: #fee2e2;
    border-color: #fca5a5;
  }
`;

const BookingSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    // 실제로는 API에서 예약 정보를 가져와야 함
    setBookingDetails({
      bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      hotelName: '그랜드 호텔 서울 | Grand Hotel Seoul',
      checkIn: '2024-01-15',
      checkOut: '2024-01-17',
      nights: 2,
      rooms: 1,
      guests: 2,
      totalPrice: 165000,
      paymentMethod: '**** **** **** 1234',
      bookingDate: new Date().toISOString().split('T')[0]
    });
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const handleDownloadReceipt = () => {
    try {
      downloadReceipt(bookingDetails, user);
      toast.success('영수증이 다운로드되었습니다');
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      toast.error('영수증 다운로드 중 오류가 발생했습니다');
    }
  };

  const handleViewBookings = () => {
    navigate('/mypage');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleReviewSubmit = async (reviewData) => {
    setIsSubmittingReview(true);
    try {
      // 실제로는 API 호출
      console.log('리뷰 제출:', reviewData);
      
      // 임시로 성공 처리
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('리뷰가 성공적으로 작성되었습니다!');
      setShowReviewForm(false);
    } catch (error) {
      console.error('리뷰 제출 오류:', error);
      toast.error('리뷰 작성 중 오류가 발생했습니다');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleReviewCancel = () => {
    setShowReviewForm(false);
  };

  if (!bookingDetails) {
    return (
      <SuccessContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div>예약 정보를 불러오는 중...</div>
          </div>
        </Container>
      </SuccessContainer>
    );
  }

  return (
    <SuccessContainer>
      <Container>
        <SuccessCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessIcon>
            <CheckCircle size={40} />
          </SuccessIcon>
          
          <SuccessTitle>예약이 완료되었습니다!</SuccessTitle>
          <SuccessSubtitle>
            예약 확인서가 이메일로 발송되었습니다
          </SuccessSubtitle>

          <BookingDetails>
            <DetailRow>
              <DetailLabel>
                <CreditCard size={20} />
                예약 번호
              </DetailLabel>
              <DetailValue>{bookingDetails.bookingId}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <MapPin size={20} />
                호텔명
              </DetailLabel>
              <DetailValue>{bookingDetails.hotelName}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <Calendar size={20} />
                체크인
              </DetailLabel>
              <DetailValue>{formatDate(bookingDetails.checkIn)}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <Calendar size={20} />
                체크아웃
              </DetailLabel>
              <DetailValue>{formatDate(bookingDetails.checkOut)}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <User size={20} />
                숙박 정보
              </DetailLabel>
              <DetailValue>
                {bookingDetails.nights}박 {bookingDetails.nights + 1}일, 
                객실 {bookingDetails.rooms}개, 
                성인 {bookingDetails.guests}명
              </DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <CreditCard size={20} />
                결제 금액
              </DetailLabel>
              <DetailValue style={{ color: '#dc2626', fontWeight: '700', fontSize: '1.125rem' }}>
                {formatPrice(bookingDetails.totalPrice)}
              </DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <CreditCard size={20} />
                결제 수단
              </DetailLabel>
              <DetailValue>{bookingDetails.paymentMethod}</DetailValue>
            </DetailRow>
          </BookingDetails>

          <ActionButtons>
            <ActionButton className="primary" onClick={handleDownloadReceipt}>
              <Download size={20} />
              영수증 다운로드
            </ActionButton>
            
            <ActionButton className="secondary" onClick={handleViewBookings}>
              <User size={20} />
              내 예약 내역
            </ActionButton>
            
            <ActionButton className="secondary" onClick={handleGoHome}>
              <Home size={20} />
              홈으로 가기
            </ActionButton>
          </ActionButtons>
        </SuccessCard>

        {/* 리뷰 작성 섹션 */}
        <ReviewSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ReviewHeader>
            <ReviewTitle>
              <Star size={24} />
              호텔 리뷰 작성
            </ReviewTitle>
            <ReviewSubtitle>
              숙박 경험을 다른 여행자들과 공유해주세요
            </ReviewSubtitle>
          </ReviewHeader>

          {!showReviewForm ? (
            <div style={{ textAlign: 'center' }}>
              <ReviewToggle onClick={() => setShowReviewForm(true)}>
                <MessageCircle size={20} />
                리뷰 작성하기
              </ReviewToggle>
            </div>
          ) : (
            <ReviewForm
              onSubmit={handleReviewSubmit}
              onCancel={handleReviewCancel}
              isSubmitting={isSubmittingReview}
            />
          )}
        </ReviewSection>
      </Container>
    </SuccessContainer>
  );
};

export default BookingSuccess;
