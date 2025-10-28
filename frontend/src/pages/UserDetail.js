import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
// import { toast } from 'react-toastify';
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
  
  &.active {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
  }
  
  &.inactive {
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 700;
  color: #2d3748;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
  color: #4a5568;
  font-weight: 500;
`;

const TableRow = styled.tr`
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    transform: scale(1.01);
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  font-size: 1.1rem;
  font-weight: 500;
`;

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userDetail, setUserDetail] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      
      // 실제 API 호출로 대체
      const mockUserDetail = {
        id: userId,
        email: 'user@example.com',
        fullName: '김철수',
        username: 'kimchulsoo',
        phoneNumber: '010-1234-5678',
        role: 'USER',
        enabled: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastLoginAt: '2024-01-15T10:30:00Z',
        totalBookings: 5,
        totalSpent: 750000,
        favoriteLocation: '서울'
      };

      const mockBookings = [
        {
          id: 1,
          dealId: '75fe7b54-8e1e-4f47-8aae-291dcd1ab1ed',
          hotelName: '그랜드 호텔 서울',
          amount: 150000,
          status: 'CONFIRMED',
          checkInDate: '2024-02-01',
          checkOutDate: '2024-02-03',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          dealId: '1a2e6184-60c4-4181-b2c7-ae94adaeccb9',
          hotelName: '부산 비치 리조트',
          amount: 125000,
          status: 'PENDING',
          checkInDate: '2024-02-15',
          checkOutDate: '2024-02-17',
          createdAt: '2024-01-14T15:20:00Z'
        },
        {
          id: 3,
          dealId: 'b1122c46-498e-4ccb-8714-6ef5380e337e',
          hotelName: '제주 아일랜드 호텔',
          amount: 100000,
          status: 'CANCELLED',
          checkInDate: '2024-01-20',
          checkOutDate: '2024-01-22',
          createdAt: '2024-01-10T09:15:00Z'
        }
      ];

      setUserDetail(mockUserDetail);
      setUserBookings(mockBookings);
    } catch (error) {
      console.error('Failed to fetch user detail:', error);
      alert('사용자 정보를 불러오는데 실패했습니다.');
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
    
    fetchUserDetail();
  }, [userId, user, navigate, fetchUserDetail]);

  const handleEditUser = () => {
    alert('사용자 수정 기능을 준비 중입니다');
    // TODO: 사용자 수정 모달 또는 페이지로 이동
  };

  const handleDeleteUser = () => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      alert('사용자가 삭제되었습니다');
      // TODO: 실제 삭제 API 호출
    }
  };

  const handleViewBooking = (dealId) => {
    navigate(`/deal/${dealId}`);
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
        return <StatusBadge className="active"><CheckCircle size={16} /> 확인됨</StatusBadge>;
      case 'PENDING':
        return <StatusBadge style={{background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)', color: 'white', boxShadow: '0 4px 15px rgba(237, 137, 54, 0.3)'}}><Clock size={16} /> 대기중</StatusBadge>;
      case 'CANCELLED':
        return <StatusBadge className="inactive"><XCircle size={16} /> 취소됨</StatusBadge>;
      default:
        return <StatusBadge style={{background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)', color: 'white', boxShadow: '0 4px 15px rgba(160, 174, 192, 0.3)'}}>{status}</StatusBadge>;
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

  if (!userDetail) {
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
          사용자를 찾을 수 없습니다.
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
        <Title>사용자 상세 정보</Title>
      </Header>

      <Content>
        <Card>
          <CardTitle>
            <User size={20} />
            기본 정보
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{userDetail.fullName}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>이메일</InfoLabel>
              <InfoValue>{userDetail.email}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>사용자명</InfoLabel>
              <InfoValue>{userDetail.username}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>전화번호</InfoLabel>
              <InfoValue>{userDetail.phoneNumber}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>역할</InfoLabel>
              <InfoValue>{userDetail.role}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>상태</InfoLabel>
              <InfoValue>
                {userDetail.enabled ? (
                  <StatusBadge className="active"><CheckCircle size={14} /> 활성</StatusBadge>
                ) : (
                  <StatusBadge className="inactive"><XCircle size={14} /> 비활성</StatusBadge>
                )}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
          
          <ActionButtons>
            <ActionButton className="primary" onClick={handleEditUser}>
              <Edit size={14} />
              수정
            </ActionButton>
            <ActionButton className="danger" onClick={handleDeleteUser}>
              <Trash2 size={14} />
              삭제
            </ActionButton>
          </ActionButtons>
        </Card>

        <Card>
          <CardTitle>
            <Calendar size={20} />
            활동 정보
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>가입일</InfoLabel>
              <InfoValue>{formatDate(userDetail.createdAt)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>마지막 로그인</InfoLabel>
              <InfoValue>{formatDate(userDetail.lastLoginAt)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>총 예약 수</InfoLabel>
              <InfoValue>{userDetail.totalBookings}건</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>총 지출</InfoLabel>
              <InfoValue>{formatPrice(userDetail.totalSpent)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>선호 지역</InfoLabel>
              <InfoValue>{userDetail.favoriteLocation}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Card>
      </Content>

      <Card>
        <CardTitle>
          <CreditCard size={20} />
          예약 내역
        </CardTitle>
        {userBookings.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <TableHeader>호텔명</TableHeader>
                <TableHeader>체크인</TableHeader>
                <TableHeader>체크아웃</TableHeader>
                <TableHeader>금액</TableHeader>
                <TableHeader>상태</TableHeader>
                <TableHeader>예약일</TableHeader>
                <TableHeader>액션</TableHeader>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.hotelName}</TableCell>
                  <TableCell>{formatDate(booking.checkInDate)}</TableCell>
                  <TableCell>{formatDate(booking.checkOutDate)}</TableCell>
                  <TableCell>{formatPrice(booking.amount)}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>{formatDate(booking.createdAt)}</TableCell>
                  <TableCell>
                    <ActionButton onClick={() => handleViewBooking(booking.dealId)}>
                      <Eye size={14} />
                      보기
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            예약 내역이 없습니다.
          </EmptyState>
        )}
      </Card>
    </Container>
  );
};

export default UserDetail;
