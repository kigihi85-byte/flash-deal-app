import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import DealDetail from './pages/DealDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import BookingSuccess from './pages/BookingSuccess';
import MyPage from './pages/MyPage';
import HotelRegistration from './pages/HotelRegistration';
import SearchPage from './pages/SearchPage';
import { DealProvider } from './context/DealContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  padding-top: 80px;
  min-height: calc(100vh - 80px);
`;

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DealProvider>
          <Router>
          <AppContainer>
            <Header />
            <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deal/:id" element={<DealDetail />} />
              <Route path="/deal/:id/payment" element={<Payment />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/hotel-registration" element={<HotelRegistration />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            </MainContent>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AppContainer>
          </Router>
        </DealProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
