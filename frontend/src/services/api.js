import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const dealService = {
  // Get all active deals
  getActiveDeals: () => api.get('/deals/active'),
  
  // Get upcoming deals
  getUpcomingDeals: () => api.get('/deals/upcoming'),
  
  // Get deals with pagination
  getActiveDealsPaginated: (page = 0, size = 10) => 
    api.get(`/deals/active/paginated?page=${page}&size=${size}`),
  
  // Get deal by ID
  getDealById: (id) => api.get(`/deals/${id}`),
  
  // Search deals
  searchDeals: (query) => api.get(`/deals/search?q=${encodeURIComponent(query)}`),
  
  // Get deals by price range
  getDealsByPriceRange: (minPrice, maxPrice) => 
    api.get(`/deals/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`),
  
  // Get deals by minimum discount
  getDealsByMinDiscount: (minDiscount) => 
    api.get(`/deals/discount?minDiscount=${minDiscount}`),
  
  // Get deals ending soon
  getDealsEndingSoon: (hours = 24) => 
    api.get(`/deals/ending-soon?hours=${hours}`),
  
  // Book a room
  bookRoom: (dealId) => api.post(`/deals/${dealId}/book`),
  
  // Cancel booking
  cancelBooking: (dealId) => api.post(`/deals/${dealId}/cancel`),
  
  // Get active deals count
  getActiveDealsCount: () => api.get('/deals/stats/count'),
};

export const authService = {
  // Login
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  
  // Register
  register: (userData) => api.post('/api/auth/register', userData),
  
  // Check email availability
  checkEmail: (email) => api.get(`/api/auth/check-email?email=${encodeURIComponent(email)}`),

  // Get current user
  getCurrentUser: () => api.get('/api/auth/me'),
  
  // Logout
  logout: () => api.post('/api/auth/logout'),
};

export default api;
