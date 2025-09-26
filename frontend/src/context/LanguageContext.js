import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ko: {
    // Header
    searchPlaceholder: '호텔, 지역 검색...',
    activeDeals: '진행중인 딜',
    upcomingDeals: '예정된 딜',
    active: '진행중',
    upcoming: '예정',
    
    // Deal Card
    live: '진행중',
    soldOut: '매진',
    expired: '만료',
    perNight: '1박당',
    roomsLeft: '객실 남음',
    bookNow: '예약하기',
    notAvailable: '예약 불가',
    startsIn: '시작까지',
    left: '남음',
    startingNow: '지금 시작',
    
    // Home Page
    flashDeals: '플래시 딜',
    amazingHotelDeals: '놀라운 호텔 딜',
    incrediblePrices: '믿을 수 없는 가격',
    limitedTimeOffers: '한정 시간 특가',
    bookNowAndSave: '지금 예약하고 절약하세요',
    viewAllDeals: '모든 딜 보기',
    totalSavings: '총 절약액',
    activeDealsCount: '진행중인 딜',
    upcomingDealsCount: '예정된 딜',
    filterBy: '필터링',
    sortBy: '정렬',
    price: '가격',
    rating: '평점',
    location: '위치',
    allLocations: '모든 지역',
    seoul: '서울',
    busan: '부산',
    jeju: '제주',
    incheon: '인천',
    gangnam: '강남',
    
    // Filter
    minPrice: '최소 가격',
    maxPrice: '최대 가격',
    minDiscount: '최소 할인율',
    clear: '초기화',
    applyFilters: '필터 적용',
    averageDiscount: '평균 할인율',
    
    // Empty States
    errorLoadingDeals: '딜 로딩 오류',
    noDealsFound: '딜을 찾을 수 없습니다',
    tryAdjustingSearch: '검색어나 필터를 조정해보세요',
    loadingMoreDeals: '더 많은 딜 로딩 중...',
    
            // Auth
            login: '로그인',
            signUp: '회원가입',
            logout: '로그아웃',
            myPage: '마이페이지',
    email: '이메일',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    fullName: '이름',
    phoneNumber: '전화번호',
    loginSubtitle: '계정에 로그인하세요',
    signUpSubtitle: '새 계정을 만드세요',
    dontHaveAccount: '계정이 없으신가요?',
    alreadyHaveAccount: '이미 계정이 있으신가요?',
    backToHome: '홈으로 돌아가기',
    or: '또는',
    loggingIn: '로그인 중...',
    creatingAccount: '계정 생성 중...',
    loginSuccess: '로그인 성공',
    loginError: '로그인 실패',
    registrationSuccess: '회원가입 성공',
    registrationError: '회원가입 실패',
    passwordMismatch: '비밀번호가 일치하지 않습니다',
    
    // Deal Detail
    backToDeals: '딜 목록으로 돌아가기',
    trustScore: '신뢰도',
    roomsAvailable: '객실 이용 가능',
    dealEnds: '딜 종료',
    dealStarts: '딜 시작',
    youSave: '절약 금액',
    bookNow: '지금 예약',
    soldOut: '매진',
    expired: '만료',
    loadingDealDetails: '딜 상세 정보 로딩 중...',
    failedToLoadDeal: '딜 정보를 불러오는데 실패했습니다',
    roomBookedSuccessfully: '객실 예약이 완료되었습니다',
    failedToBookRoom: '객실 예약에 실패했습니다',
    amenities: '편의시설',
    freeWifi: '무료 WiFi',
    parking: '주차장',
    breakfast: '조식',
    gym: '헬스장',
    restaurant: '레스토랑',
    secureBooking: '안전한 예약',
    instantConfirmation: '즉시 확인',
    bestPriceGuarantee: '최저가 보장',
    freeCancellation: '무료 취소',
    
    // Payment
    paymentDetails: '결제 정보',
    guestInformation: '투숙객 정보',
    firstName: '이름',
    lastName: '성',
    bookingDetails: '예약 정보',
    checkIn: '체크인',
    checkOut: '체크아웃',
    guests: '투숙객',
    paymentMethod: '결제 방법',
    creditCard: '신용카드',
    cardNumber: '카드 번호',
    expiryDate: '만료일',
    cvv: 'CVV',
    cardholderName: '카드 소유자명',
    payNow: '결제하기',
    processing: '처리 중...',
    securePayment: '안전한 결제',
    bookingSummary: '예약 요약',
    backToDeal: '딜로 돌아가기',
    nights: '박',
    taxes: '세금',
    total: '총액',
    paymentSuccess: '결제가 완료되었습니다',
    paymentError: '결제에 실패했습니다',
    
    // Common
    loading: '로딩 중...',
    error: '오류가 발생했습니다',
    tryAgain: '다시 시도',
  },
  en: {
    // Header
    searchPlaceholder: 'Search hotels, locations...',
    activeDeals: 'Active Deals',
    upcomingDeals: 'Upcoming Deals',
    active: 'Active',
    upcoming: 'Upcoming',
    
    // Deal Card
    live: 'Live',
    soldOut: 'Sold Out',
    expired: 'Expired',
    perNight: 'per night',
    roomsLeft: 'rooms left',
    bookNow: 'Book Now',
    notAvailable: 'Not Available',
    startsIn: 'Starts in',
    left: 'left',
    startingNow: 'Starting now',
    
    // Home Page
    flashDeals: 'Flash Deals',
    amazingHotelDeals: 'Amazing Hotel Deals',
    incrediblePrices: 'Incredible Prices',
    limitedTimeOffers: 'Limited Time Offers',
    bookNowAndSave: 'Book Now and Save',
    viewAllDeals: 'View All Deals',
    totalSavings: 'Total Savings',
    activeDealsCount: 'Active Deals',
    upcomingDealsCount: 'Upcoming Deals',
    filterBy: 'Filter by',
    sortBy: 'Sort by',
    price: 'Price',
    rating: 'Rating',
    location: 'Location',
    allLocations: 'All Locations',
    seoul: 'Seoul',
    busan: 'Busan',
    jeju: 'Jeju',
    incheon: 'Incheon',
    gangnam: 'Gangnam',
    
    // Filter
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    minDiscount: 'Min Discount',
    clear: 'Clear',
    applyFilters: 'Apply Filters',
    averageDiscount: 'Average Discount',
    
    // Empty States
    errorLoadingDeals: 'Error Loading Deals',
    noDealsFound: 'No Deals Found',
    tryAdjustingSearch: 'Try adjusting your search or filters to find more deals.',
    loadingMoreDeals: 'Loading more deals...',
    
            // Auth
            login: 'Login',
            signUp: 'Sign Up',
            logout: 'Logout',
            myPage: 'My Page',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    loginSubtitle: 'Sign in to your account',
    signUpSubtitle: 'Create a new account',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    backToHome: 'Back to Home',
    or: 'or',
    loggingIn: 'Logging in...',
    creatingAccount: 'Creating account...',
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    registrationSuccess: 'Registration successful',
    registrationError: 'Registration failed',
    passwordMismatch: 'Passwords do not match',
    
    // Deal Detail
    backToDeals: 'Back to Deals',
    trustScore: 'Trust Score',
    roomsAvailable: 'Rooms Available',
    dealEnds: 'Deal Ends',
    dealStarts: 'Deal Starts',
    youSave: 'You Save',
    bookNow: 'Book Now',
    soldOut: 'Sold Out',
    expired: 'Expired',
    loadingDealDetails: 'Loading deal details...',
    failedToLoadDeal: 'Failed to load deal details',
    roomBookedSuccessfully: 'Room booked successfully!',
    failedToBookRoom: 'Failed to book room',
    amenities: 'Amenities',
    freeWifi: 'Free WiFi',
    parking: 'Parking',
    breakfast: 'Breakfast',
    gym: 'Gym',
    restaurant: 'Restaurant',
    secureBooking: 'Secure Booking',
    instantConfirmation: 'Instant Confirmation',
    bestPriceGuarantee: 'Best Price Guarantee',
    freeCancellation: 'Free Cancellation',
    
    // Payment
    paymentDetails: 'Payment Details',
    guestInformation: 'Guest Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    bookingDetails: 'Booking Details',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit Card',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    cardholderName: 'Cardholder Name',
    payNow: 'Pay Now',
    processing: 'Processing...',
    securePayment: 'Secure Payment',
    bookingSummary: 'Booking Summary',
    backToDeal: 'Back to Deal',
    nights: 'nights',
    taxes: 'Taxes',
    total: 'Total',
    paymentSuccess: 'Payment completed successfully',
    paymentError: 'Payment failed',
    
    // Common
    loading: 'Loading...',
    error: 'An error occurred',
    tryAgain: 'Try Again',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ko';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
