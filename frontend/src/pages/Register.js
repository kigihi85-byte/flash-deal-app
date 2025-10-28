import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

const RegisterContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const RegisterCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3b82f6;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
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

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  width: 1.25rem;
  height: 1.25rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: #64748b;
  }
`;

const RegisterButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }
  
  span {
    padding: 0 1rem;
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const LoginLink = styled(Link)`
  text-align: center;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #1d4ed8;
  }
`;

const Register = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // 이메일 중복 체크
    if (e.target.name === 'email' && e.target.value) {
      checkEmailAvailability(e.target.value);
    }
  };

  const checkEmailAvailability = async (email) => {
    if (!email || !email.includes('@')) {
      setEmailError('');
      return;
    }
    
    setCheckingEmail(true);
    try {
      const response = await authService.checkEmail(email);
      if (response.data.available) {
        setEmailError('');
      } else {
        setEmailError('이미 사용 중인 이메일입니다');
      }
    } catch (error) {
      // 서버에서 중복 체크 API가 없을 경우 무시
      setEmailError('');
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }
    
    if (emailError) {
      toast.error('이메일을 확인해주세요');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/login');
      }
    } catch (error) {
      toast.error(t('registrationError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BackButton to="/">
          <ArrowLeft size={16} />
          {t('backToHome')}
        </BackButton>
        
        <Title>{t('signUp')}</Title>
        <Subtitle>{t('signUpSubtitle')}</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              name="fullName"
              placeholder={t('fullName')}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder={t('email')}
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderColor: emailError ? '#ef4444' : undefined }}
            />
            {checkingEmail && <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>확인 중...</div>}
            {emailError && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{emailError}</div>}
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <Phone size={20} />
            </InputIcon>
            <Input
              type="tel"
              name="phone"
              placeholder={t('phoneNumber')}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('password')}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder={t('confirmPassword')}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputGroup>
          
          <RegisterButton type="submit" disabled={loading}>
            {loading ? `${t('creatingAccount')}...` : t('signUp')}
          </RegisterButton>
        </Form>
        
        <Divider>
          <span>{t('or')}</span>
        </Divider>
        
        <LoginLink to="/login">
          {t('alreadyHaveAccount')} {t('login')}
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
