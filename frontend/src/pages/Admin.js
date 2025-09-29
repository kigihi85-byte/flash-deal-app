import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Users, 
  Hotel, 
  CreditCard, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  TrendingUp,
  Calendar,
  DollarSign,
  UserCheck,
  AlertCircle,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const AdminHeader = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const AdminSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
      case 'green': return '#dcfce7';
      case 'orange': return '#fed7aa';
      case 'purple': return '#e9d5ff';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch(props.color) {
      case 'blue': return '#2563eb';
      case 'green': return '#16a34a';
      case 'orange': return '#ea580c';
      case 'purple': return '#9333ea';
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

const StatChange = styled.div`
  font-size: 0.75rem;
  color: ${props => props.positive ? '#16a34a' : '#dc2626'};
  font-weight: 500;
  margin-top: 0.5rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.5rem;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
  
  &.danger:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  
  &:hover {
    background: #b91c1c;
  }
`;

const RecentActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const ActivityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
`;

const ActivityTime = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddDeal = () => {
    toast.success('새 딜 추가 기능을 준비 중입니다');
    // TODO: 딜 추가 모달 또는 페이지로 이동
  };

  const handleViewDeal = (dealId) => {
    navigate(`/deal/${dealId}`);
  };

  const handleEditDeal = (dealId) => {
    toast.success('딜 수정 기능을 준비 중입니다');
    // TODO: 딜 수정 모달 또는 페이지로 이동
  };

  const handleDeleteDeal = (dealId) => {
    if (window.confirm('정말로 이 딜을 삭제하시겠습니까?')) {
      toast.success('딜이 삭제되었습니다');
      // TODO: 실제 삭제 API 호출
    }
  };

  const handleUserManagement = () => {
    toast.success('사용자 관리 기능을 준비 중입니다');
    // TODO: 사용자 관리 페이지로 이동
  };

  const handleViewReport = () => {
    toast.success('리포트 보기 기능을 준비 중입니다');
    // TODO: 리포트 페이지로 이동
  };

  const handleSystemSettings = () => {
    toast.success('시스템 설정 기능을 준비 중입니다');
    // TODO: 시스템 설정 페이지로 이동
  };
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeals: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      toast.error('관리자 권한이 필요합니다.');
      navigate('/');
      return;
    }
    
    fetchAdminData();
  }, [user, navigate]);

  const fetchAdminData = async () => {
    try {
      // 실제 API 호출로 대체
      setStats({
        totalUsers: 1247,
        totalDeals: 89,
        totalBookings: 3421,
        totalRevenue: 125000000
      });

      setRecentBookings([
        { id: 1, dealId: '75fe7b54-8e1e-4f47-8aae-291dcd1ab1ed', hotelName: '그랜드 호텔 서울', user: '김철수', amount: 150000, date: '2024-01-15' },
        { id: 2, dealId: '1a2e6184-60c4-4181-b2c7-ae94adaeccb9', hotelName: '부산 비치 리조트', user: '이영희', amount: 125000, date: '2024-01-15' },
        { id: 3, dealId: 'b1122c46-498e-4ccb-8714-6ef5380e337e', hotelName: '제주 아일랜드 호텔', user: '박민수', amount: 100000, date: '2024-01-14' },
        { id: 4, dealId: '1a194000-4268-497d-9f5a-91bf33bd9698', hotelName: '도쿄 스카이 호텔', user: '정수진', amount: 200000, date: '2024-01-14' },
        { id: 5, dealId: '8b666dd8-cda8-4906-8b7b-f77cf6e633e9', hotelName: '홍콩 하버 호텔', user: '최동현', amount: 225000, date: '2024-01-13' }
      ]);

      setRecentUsers([
        { id: 1, name: '김철수', email: 'kim@email.com', joinDate: '2024-01-15', bookings: 3 },
        { id: 2, name: '이영희', email: 'lee@email.com', joinDate: '2024-01-14', bookings: 1 },
        { id: 3, name: '박민수', email: 'park@email.com', joinDate: '2024-01-13', bookings: 2 },
        { id: 4, name: '정수진', email: 'jung@email.com', joinDate: '2024-01-12', bookings: 1 },
        { id: 5, name: '최동현', email: 'choi@email.com', joinDate: '2024-01-11', bookings: 4 }
      ]);

      setRecentActivity([
        { id: 1, text: '새로운 딜이 등록되었습니다: 도쿄 스카이 호텔', time: '2분 전', icon: Hotel },
        { id: 2, text: '김철수님이 그랜드 호텔 서울을 예약했습니다', time: '15분 전', icon: CreditCard },
        { id: 3, text: '새로운 사용자가 가입했습니다: 이영희', time: '1시간 전', icon: UserCheck },
        { id: 4, text: '부산 비치 리조트 딜이 종료되었습니다', time: '2시간 전', icon: AlertCircle },
        { id: 5, text: '월간 매출 목표를 달성했습니다', time: '3시간 전', icon: TrendingUp }
      ]);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      toast.error('관리자 데이터를 불러오는데 실패했습니다.');
    }
  };

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

  return (
    <AdminContainer>
      <Container>
        <AdminHeader>
          <AdminTitle>관리자 대시보드</AdminTitle>
          <AdminSubtitle>FlashDeal 관리자 패널에 오신 것을 환영합니다</AdminSubtitle>
        </AdminHeader>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatIcon color="blue">
              <Users size={24} />
            </StatIcon>
            <StatValue>{stats.totalUsers.toLocaleString()}</StatValue>
            <StatLabel>총 사용자</StatLabel>
            <StatChange positive>+12% 이번 달</StatChange>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatIcon color="green">
              <Hotel size={24} />
            </StatIcon>
            <StatValue>{stats.totalDeals}</StatValue>
            <StatLabel>활성 딜</StatLabel>
            <StatChange positive>+5% 이번 주</StatChange>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatIcon color="orange">
              <CreditCard size={24} />
            </StatIcon>
            <StatValue>{stats.totalBookings.toLocaleString()}</StatValue>
            <StatLabel>총 예약</StatLabel>
            <StatChange positive>+8% 이번 달</StatChange>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatIcon color="purple">
              <DollarSign size={24} />
            </StatIcon>
            <StatValue>{formatPrice(stats.totalRevenue)}</StatValue>
            <StatLabel>총 매출</StatLabel>
            <StatChange positive>+15% 이번 달</StatChange>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <MainContent>
            <Card>
              <CardTitle>
                <CreditCard size={20} />
                최근 예약
                <AddButton onClick={handleAddDeal}>
                  <Plus size={16} />
                  새 딜 추가
                </AddButton>
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>호텔</TableHeader>
                    <TableHeader>고객</TableHeader>
                    <TableHeader>금액</TableHeader>
                    <TableHeader>날짜</TableHeader>
                    <TableHeader>액션</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.hotelName}</TableCell>
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{formatPrice(booking.amount)}</TableCell>
                      <TableCell>{formatDate(booking.date)}</TableCell>
                      <TableCell>
                        <ActionButton onClick={() => handleViewDeal(booking.dealId)}>
                          <Eye size={14} />
                          보기
                        </ActionButton>
                        <ActionButton onClick={() => handleEditDeal(booking.id)}>
                          <Edit size={14} />
                          수정
                        </ActionButton>
                        <ActionButton 
                          className="danger" 
                          onClick={() => handleDeleteDeal(booking.id)}
                        >
                          <Trash2 size={14} />
                          삭제
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </Card>

            <Card>
              <CardTitle>
                <Users size={20} />
                최근 사용자
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>이름</TableHeader>
                    <TableHeader>이메일</TableHeader>
                    <TableHeader>가입일</TableHeader>
                    <TableHeader>예약수</TableHeader>
                    <TableHeader>액션</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.joinDate)}</TableCell>
                      <TableCell>{user.bookings}</TableCell>
                      <TableCell>
                        <ActionButton>
                          <Eye size={14} />
                          보기
                        </ActionButton>
                        <ActionButton className="danger">
                          <Trash2 size={14} />
                          삭제
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </Card>
          </MainContent>

          <Sidebar>
            <Card>
              <CardTitle>
                <BarChart3 size={20} />
                최근 활동
              </CardTitle>
              <RecentActivity>
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon>
                      <activity.icon size={16} />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityText>{activity.text}</ActivityText>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </RecentActivity>
            </Card>

            <Card>
              <CardTitle>
                <Calendar size={20} />
                빠른 액션
              </CardTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <AddButton onClick={handleAddDeal}>
                  <Plus size={16} />
                  새 딜 생성
                </AddButton>
                <AddButton onClick={handleUserManagement}>
                  <Users size={16} />
                  사용자 관리
                </AddButton>
                <AddButton onClick={handleViewReport}>
                  <BarChart3 size={16} />
                  리포트 보기
                </AddButton>
                <AddButton onClick={handleSystemSettings}>
                  <Settings size={16} />
                  시스템 설정
                </AddButton>
              </div>
            </Card>
          </Sidebar>
        </ContentGrid>
      </Container>
    </AdminContainer>
  );
};

export default Admin;
