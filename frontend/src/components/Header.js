import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Clock, Flame, Menu, X, Globe, User, LogIn, LogOut, Settings } from 'lucide-react';
import { useDeals } from '../context/DealContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #1e293b;
  font-weight: 700;
  font-size: 1.5rem;
  
  &:hover {
    color: #3b82f6;
  }
`;

const LogoIcon = styled(Flame)`
  color: #f59e0b;
  width: 2rem;
  height: 2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 2rem;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  width: 1.25rem;
  height: 1.25rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LanguageSwitcher = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 80px;
  justify-content: center;
  
  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    min-width: 60px;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &.login {
    color: #64748b;
    
    &:hover {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }
  }
  
  &.signup {
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #1d4ed8;
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #64748b;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }
`;

const UserDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  
  &:hover {
    background: #f8fafc;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchDeals, activeDeals, upcomingDeals } = useDeals();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchDeals(query);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoIcon />
          FlashDeal
        </Logo>
        
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchContainer>
        
        <Nav>
          <NavLink to="/">
            <Flame />
            {t('activeDeals')} ({activeDeals.length})
          </NavLink>
          <NavLink to="/upcoming">
            <Clock />
            {t('upcomingDeals')} ({upcomingDeals.length})
          </NavLink>
          
          <LanguageSwitcher onClick={toggleLanguage}>
            <Globe size={16} />
            {language === 'ko' ? 'KOR' : 'ENG'}
          </LanguageSwitcher>
          
          {isAuthenticated ? (
            <UserMenu>
              <UserButton onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <User size={16} />
                {user?.fullName || user?.email}
              </UserButton>
              {isUserMenuOpen && (
                <UserDropdown
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <DropdownItem>
                    <Settings size={16} />
                    {t('myPage')}
                  </DropdownItem>
                  <DropdownItem onClick={logout}>
                    <LogOut size={16} />
                    {t('logout')}
                  </DropdownItem>
                </UserDropdown>
              )}
            </UserMenu>
          ) : (
            <AuthButtons>
              <AuthButton to="/login" className="login">
                <LogIn size={16} />
                {t('login')}
              </AuthButton>
              <AuthButton to="/register" className="signup">
                <User size={16} />
                {t('signUp')}
              </AuthButton>
            </AuthButtons>
          )}
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </Nav>
        
        <StatsContainer>
          <StatItem>
            <Flame size={16} />
            {activeDeals.length} {t('active')}
          </StatItem>
          <StatItem>
            <Clock size={16} />
            {upcomingDeals.length} {t('upcoming')}
          </StatItem>
        </StatsContainer>
      </HeaderContent>
      
      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <MobileNav>
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Flame size={20} />
              {t('activeDeals')} ({activeDeals.length})
            </MobileNavLink>
            <MobileNavLink to="/upcoming" onClick={() => setIsMobileMenuOpen(false)}>
              <Clock size={20} />
              {t('upcomingDeals')} ({upcomingDeals.length})
            </MobileNavLink>
            <LanguageSwitcher onClick={toggleLanguage}>
              <Globe size={20} />
              {language === 'ko' ? 'KOR' : 'ENG'}
            </LanguageSwitcher>
            {isAuthenticated ? (
              <>
                <DropdownItem onClick={() => setIsMobileMenuOpen(false)}>
                  <Settings size={20} />
                  {t('myPage')}
                </DropdownItem>
                <DropdownItem onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                  <LogOut size={20} />
                  {t('logout')}
                </DropdownItem>
              </>
            ) : (
              <>
                <AuthButton to="/login" className="login" onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn size={20} />
                  {t('login')}
                </AuthButton>
                <AuthButton to="/register" className="signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={20} />
                  {t('signUp')}
                </AuthButton>
              </>
            )}
          </MobileNav>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
