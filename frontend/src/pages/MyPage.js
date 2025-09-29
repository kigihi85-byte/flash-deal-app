import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut,
  Edit,
  Trash2,
  Eye,
  Download,
  Star,
  Clock,
  MessageCircle
} from 'lucide-react';
import { downloadReceipt } from '../utils/pdfGenerator';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyPageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageHeader = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const ProfileName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const MenuCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const MenuTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: none;
  background: none;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: #f3f4f6;
    color: #dc2626;
  }
  
  &.active {
    background: #fef2f2;
    color: #dc2626;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BookingCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BookingTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
`;

const BookingStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  &.confirmed {
    background: #dcfce7;
    color: #166534;
  }
  
  &.pending {
    background: #fef3c7;
    color: #92400e;
  }
  
  &.cancelled {
    background: #fee2e2;
    color: #991b1b;
  }
`;

const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BookingItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #dc2626;
    box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.1);
  }
`;

const BookingInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const BookingActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
  
  &.danger:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

const MyPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // 실제로는 API에서 예약 내역을 가져와야 함
    setBookings([
      {
        id: 'BK001',
        hotelName: '그랜드 호텔 서울 | Grand Hotel Seoul',
        checkIn: '2024-01-15',
        checkOut: '2024-01-17',
        nights: 2,
        rooms: 1,
        guests: 2,
        totalPrice: 165000,
        status: 'confirmed',
        bookingDate: '2024-01-10'
      },
      {
        id: 'BK002',
        hotelName: '부산 비치 리조트 | Busan Beach Resort',
        checkIn: '2024-02-20',
        checkOut: '2024-02-22',
        nights: 2,
        rooms: 1,
        guests: 2,
        totalPrice: 137500,
        status: 'pending',
        bookingDate: '2024-01-12'
      }
    ]);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCancelBooking = (bookingId) => {
    toast.success('예약이 취소되었습니다');
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  const handleWriteReview = (booking) => {
    // 호텔 상세 페이지로 이동하여 리뷰 작성
    navigate(`/deal/${booking.dealId || 'sample-deal-id'}?writeReview=true`);
  };

  const handleDownloadReceipt = (booking) => {
    try {
      downloadReceipt(booking, user);
      toast.success('영수증이 다운로드되었습니다');
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      toast.error('영수증 다운로드 중 오류가 발생했습니다');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return '확정';
      case 'pending': return '대기중';
      case 'cancelled': return '취소됨';
      default: return status;
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <MyPageContainer>
      <Container>
        <PageHeader>
          <PageTitle>마이페이지</PageTitle>
          <PageSubtitle>예약 내역과 계정 정보를 관리하세요</PageSubtitle>
        </PageHeader>

        <ContentGrid>
          <Sidebar>
            <ProfileCard>
              <ProfileAvatar>
                {user.fullName ? user.fullName.charAt(0) : user.email.charAt(0).toUpperCase()}
              </ProfileAvatar>
              <ProfileName>{user.fullName || '사용자'}</ProfileName>
              <ProfileEmail>{user.email}</ProfileEmail>
              
              <ProfileStats>
                <StatItem>
                  <StatValue>{bookings.length}</StatValue>
                  <StatLabel>총 예약</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{bookings.filter(b => b.status === 'confirmed').length}</StatValue>
                  <StatLabel>확정</StatLabel>
                </StatItem>
              </ProfileStats>
            </ProfileCard>

            <MenuCard>
              <MenuTitle>메뉴</MenuTitle>
              <MenuItem 
                className={activeTab === 'bookings' ? 'active' : ''}
                onClick={() => setActiveTab('bookings')}
              >
                <Calendar size={16} />
                예약 내역
              </MenuItem>
              <MenuItem 
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} />
                프로필 수정
              </MenuItem>
              <MenuItem 
                className={activeTab === 'settings' ? 'active' : ''}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={16} />
                설정
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogOut size={16} />
                로그아웃
              </MenuItem>
            </MenuCard>
          </Sidebar>

          <MainContent>
            {activeTab === 'bookings' && (
              <BookingCard>
                <BookingHeader>
                  <BookingTitle>예약 내역</BookingTitle>
                </BookingHeader>

                {bookings.length === 0 ? (
                  <EmptyState>
                    <Calendar size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>예약 내역이 없습니다</p>
                  </EmptyState>
                ) : (
                  <BookingList>
                    {bookings.map((booking) => (
                      <BookingItem key={booking.id}>
                        <BookingInfo>
                          <InfoItem>
                            <MapPin size={16} />
                            {booking.hotelName}
                          </InfoItem>
                          <InfoItem>
                            <Calendar size={16} />
                            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                          </InfoItem>
                          <InfoItem>
                            <Clock size={16} />
                            {booking.nights}박 {booking.nights + 1}일
                          </InfoItem>
                          <InfoItem>
                            <CreditCard size={16} />
                            {formatPrice(booking.totalPrice)}
                          </InfoItem>
                        </BookingInfo>
                        
                        <BookingActions>
                          <BookingStatus className={booking.status}>
                            {getStatusText(booking.status)}
                          </BookingStatus>
                          
                          <ActionButton onClick={() => handleDownloadReceipt(booking)}>
                            <Download size={14} />
                            영수증
                          </ActionButton>
                          
                          {booking.status === 'confirmed' && (
                            <ActionButton onClick={() => handleWriteReview(booking)}>
                              <MessageCircle size={14} />
                              리뷰 작성
                            </ActionButton>
                          )}
                          
                          {booking.status !== 'cancelled' && (
                            <ActionButton 
                              className="danger"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <Trash2 size={14} />
                              취소
                            </ActionButton>
                          )}
                        </BookingActions>
                      </BookingItem>
                    ))}
                  </BookingList>
                )}
              </BookingCard>
            )}

            {activeTab === 'profile' && (
              <BookingCard>
                <BookingTitle>프로필 수정</BookingTitle>
                <p>프로필 수정 기능은 준비 중입니다.</p>
              </BookingCard>
            )}

            {activeTab === 'settings' && (
              <BookingCard>
                <BookingTitle>설정</BookingTitle>
                <p>설정 기능은 준비 중입니다.</p>
              </BookingCard>
            )}
          </MainContent>
        </ContentGrid>
      </Container>
    </MyPageContainer>
  );
};

export default MyPage;
