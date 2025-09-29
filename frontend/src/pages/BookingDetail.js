import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  ArrowLeft, 
  Calendar, 
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  User,
  MapPin,
  Phone,
  Mail,
  Hotel,
  DollarSign,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
    transform: translateX(5px);
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
  min-width: 100px;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #2d3748;
  font-weight: 600;
  font-size: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.confirmed {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
  }
  
  &.pending {
    background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(237, 137, 54, 0.3);
  }
  
  &.cancelled {
    background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e2e8f0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &.danger {
    background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    }
  }

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    }
  }
`;

const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
`;

const BookingDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookingDetail, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookingDetail = async () => {
    try {
      setLoading(true);
      
      // 실제 API 호출로 대체
      const mockBookingDetail = {
        id: bookingId,
        dealId: '75fe7b54-8e1e-4f47-8aae-291dcd1ab1ed',
        userId: 'user-123',
        hotelName: '그랜드 호텔 서울',
        location: '서울, 대한민국',
        checkInDate: '2024-02-01',
        checkOutDate: '2024-02-03',
        guests: 2,
        rooms: 1,
        originalPrice: 300000,
        discountedPrice: 150000,
        discountPercentage: 50,
        totalAmount: 150000,
        status: 'CONFIRMED',
        paymentMethod: 'CREDIT_CARD',
        paymentStatus: 'PAID',
        bookingDate: '2024-01-15T10:30:00Z',
        confirmationNumber: 'BK20240115001',
        specialRequests: '고층 객실 요청',
        userInfo: {
          name: '김철수',
          email: 'kim@example.com',
          phone: '010-1234-5678'
        },
        dealInfo: {
          description: '서울 중심가의 럭셔리 호텔로 멋진 도시 전망을 제공합니다',
          amenities: ['무료 WiFi', '수영장', '피트니스 센터', '레스토랑'],
          trustScore: 5
        }
      };

      setBookingDetail(mockBookingDetail);
    } catch (error) {
      console.error('Failed to fetch booking detail:', error);
      alert('예약 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      alert('관리자 권한이 필요합니다.');
      navigate('/');
      return;
    }
    
    fetchBookingDetail();
  }, [bookingId, user, navigate]);

  const handleEditBooking = () => {
    alert('예약 수정 기능을 준비 중입니다');
    // TODO: 예약 수정 모달 또는 페이지로 이동
  };

  const handleCancelBooking = () => {
    if (window.confirm('정말로 이 예약을 취소하시겠습니까?')) {
      alert('예약이 취소되었습니다');
      // TODO: 실제 취소 API 호출
    }
  };

  const handleViewDeal = () => {
    navigate(`/deal/${bookingDetail.dealId}`);
  };

  const handleViewUser = () => {
    navigate(`/admin/user/${bookingDetail.userId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <StatusBadge className="confirmed"><CheckCircle size={16} /> 확인됨</StatusBadge>;
      case 'PENDING':
        return <StatusBadge className="pending"><Clock size={16} /> 대기중</StatusBadge>;
      case 'CANCELLED':
        return <StatusBadge className="cancelled"><XCircle size={16} /> 취소됨</StatusBadge>;
      default:
        return <StatusBadge className="pending">{status}</StatusBadge>;
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          로딩 중...
        </div>
      </Container>
    );
  }

  if (!bookingDetail) {
    return (
      <Container>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          예약을 찾을 수 없습니다.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/admin')}>
          <ArrowLeft size={16} />
          관리자 대시보드로 돌아가기
        </BackButton>
        <Title>예약 상세 정보</Title>
      </Header>

      <Content>
        <Card>
          <CardTitle>
            <Hotel size={20} />
            예약 정보
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>예약 번호</InfoLabel>
              <InfoValue>{bookingDetail.confirmationNumber}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>호텔명</InfoLabel>
              <InfoValue>{bookingDetail.hotelName}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>위치</InfoLabel>
              <InfoValue>{bookingDetail.location}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>체크인</InfoLabel>
              <InfoValue>{formatDate(bookingDetail.checkInDate)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>체크아웃</InfoLabel>
              <InfoValue>{formatDate(bookingDetail.checkOutDate)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>객실 수</InfoLabel>
              <InfoValue>{bookingDetail.rooms}개</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>투숙객</InfoLabel>
              <InfoValue>{bookingDetail.guests}명</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>상태</InfoLabel>
              <InfoValue>{getStatusBadge(bookingDetail.status)}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Card>

        <Card>
          <CardTitle>
            <User size={20} />
            고객 정보
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{bookingDetail.userInfo.name}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>이메일</InfoLabel>
              <InfoValue>{bookingDetail.userInfo.email}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>전화번호</InfoLabel>
              <InfoValue>{bookingDetail.userInfo.phone}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>예약일</InfoLabel>
              <InfoValue>{formatDate(bookingDetail.bookingDate)}</InfoValue>
            </InfoItem>
          </InfoGrid>
          
          <ActionButtons>
            <ActionButton className="primary" onClick={handleViewUser}>
              <User size={14} />
              고객 정보 보기
            </ActionButton>
          </ActionButtons>
        </Card>
      </Content>

      <Content>
        <Card>
          <CardTitle>
            <DollarSign size={20} />
            결제 정보
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>원가</InfoLabel>
              <InfoValue>{formatPrice(bookingDetail.originalPrice)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>할인가</InfoLabel>
              <InfoValue>{formatPrice(bookingDetail.discountedPrice)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>할인율</InfoLabel>
              <InfoValue>{bookingDetail.discountPercentage}%</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>총 금액</InfoLabel>
              <InfoValue style={{fontSize: '1.2rem', color: '#667eea'}}>{formatPrice(bookingDetail.totalAmount)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>결제 방법</InfoLabel>
              <InfoValue>{bookingDetail.paymentMethod === 'CREDIT_CARD' ? '신용카드' : bookingDetail.paymentMethod}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>결제 상태</InfoLabel>
              <InfoValue>{getStatusBadge(bookingDetail.paymentStatus)}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Card>

        <Card>
          <CardTitle>
            <FileText size={20} />
            추가 정보
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>특별 요청</InfoLabel>
              <InfoValue>{bookingDetail.specialRequests || '없음'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>신뢰도 점수</InfoLabel>
              <InfoValue>⭐ {bookingDetail.dealInfo.trustScore}/5</InfoValue>
            </InfoItem>
          </InfoGrid>
          
          <ActionButtons>
            <ActionButton className="primary" onClick={handleViewDeal}>
              <Eye size={14} />
              딜 정보 보기
            </ActionButton>
            <ActionButton onClick={handleEditBooking}>
              <Edit size={14} />
              수정
            </ActionButton>
            <ActionButton className="danger" onClick={handleCancelBooking}>
              <Trash2 size={14} />
              취소
            </ActionButton>
          </ActionButtons>
        </Card>
      </Content>

      <FullWidthCard>
        <CardTitle>
          <Hotel size={20} />
          호텔 정보
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>설명</InfoLabel>
            <InfoValue>{bookingDetail.dealInfo.description}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>편의시설</InfoLabel>
            <InfoValue>{bookingDetail.dealInfo.amenities.join(', ')}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </FullWidthCard>
    </Container>
  );
};

export default BookingDetail;
