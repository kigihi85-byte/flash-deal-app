import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Flame, Menu, X, User, LogOut, Settings, Users, ChevronRight, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  position: relative;
`;

const SearchContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:focus-within {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: #dc2626;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #dc2626;
  font-size: 1.5rem;
  font-weight: 800;
  transition: all 0.2s ease;
  margin-right: 2rem;

  &:hover {
    color: #b91c1c;
    transform: scale(1.05);
  }
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #dc2626;
    background: #fef2f2;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RegisterButton = styled(Link)`
  padding: 0.5rem 1rem;
  border: 1px solid #3b82f6;
  border-radius: 6px;
  background: #ffffff;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
  
  &:hover {
    background: #eff6ff;
  }
`;

const ProfileIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const FlagIcon = styled.div`
  width: 1.5rem;
  height: 1rem;
  background: #dc2626;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: #ffffff;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    background: #000000;
    border-radius: 50%;
  }
`;

const CurrencySymbol = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
`;

const LoginLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #3b82f6;
  border-radius: 6px;
  background: #ffffff;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #eff6ff;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 0;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
`;

const UserEmail = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const UserProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #e5e7eb;
    color: #dc2626;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #e5e7eb;
    color: #dc2626;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <Logo to="/">
            <LogoIcon>F</LogoIcon>
            FlashDeal
          </Logo>
          
          <Nav>
            <NavLink to="/search">
              <span>숙소</span>
            </NavLink>
            
            <NavLink to="/activities">
              <span>즐길 거리</span>
            </NavLink>
          </Nav>
        </LeftSection>

        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="호텔명, 도시, 지역을 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <Search size={16} />
            </SearchButton>
          </form>
        </SearchContainer>

        <RightSection>
          <RegisterButton to="/hotel-registration">
            숙소 등록
          </RegisterButton>
          
          <ProfileIcon>
            <User size={16} />
          </ProfileIcon>
          
          <FlagIcon />
          
          <CurrencySymbol>₩</CurrencySymbol>
          
          {user ? (
            <>
              <UserMenu>
                <UserInfo>
                  <UserName>{user.fullName}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
                <UserProfileLink to="/mypage">
                  <User size={16} />
                  마이페이지
                </UserProfileLink>
                {user.role === 'ADMIN' && (
                  <UserProfileLink to="/admin">
                    <Settings size={16} />
                    관리자
                  </UserProfileLink>
                )}
                <LogoutButton onClick={logout}>
                  <LogOut size={16} />
                  로그아웃
                </LogoutButton>
              </UserMenu>
            </>
          ) : (
            <>
              <LoginLink to="/login">
                로그인
              </LoginLink>
              
              <SignUpButton>
                회원 가입
              </SignUpButton>
            </>
          )}
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;