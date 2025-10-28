import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { dealService } from '../services/api';
import toast from 'react-hot-toast';

const DealContext = createContext();

const initialState = {
  activeDeals: [],
  upcomingDeals: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    minPrice: null,
    maxPrice: null,
    minDiscount: null,
  },
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },
};

const dealReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_ACTIVE_DEALS':
      return { ...state, activeDeals: action.payload, loading: false, error: null };
    
    case 'SET_UPCOMING_DEALS':
      return { ...state, upcomingDeals: action.payload, loading: false, error: null };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    
    case 'UPDATE_DEAL':
      return {
        ...state,
        activeDeals: state.activeDeals.map(deal => 
          deal.id === action.payload.id ? action.payload : deal
        ),
        upcomingDeals: state.upcomingDeals.map(deal => 
          deal.id === action.payload.id ? action.payload : deal
        ),
      };
    
    case 'CLEAR_FILTERS':
      return { ...state, filters: initialState.filters, searchQuery: '' };
    
    default:
      return state;
  }
};

export const DealProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dealReducer, initialState);

  const fetchActiveDeals = async (page = 0, size = 10) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await dealService.getActiveDeals();
      
      dispatch({ type: 'SET_ACTIVE_DEALS', payload: response.data });
      dispatch({ 
        type: 'SET_PAGINATION', 
        payload: { page, size, totalPages: 1, totalElements: response.data.length } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to fetch deals');
    }
  };

  const fetchUpcomingDeals = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await dealService.getUpcomingDeals();
      dispatch({ type: 'SET_UPCOMING_DEALS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to fetch upcoming deals');
    }
  };

  const searchDeals = async (query) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
      
      if (!query.trim()) {
        await fetchActiveDeals();
        return;
      }
      
      const response = await dealService.searchDeals(query);
      dispatch({ type: 'SET_ACTIVE_DEALS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Search failed');
    }
  };

  const filterDealsByPrice = async (minPrice, maxPrice) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_FILTERS', payload: { minPrice, maxPrice } });
      
      const response = await dealService.getDealsByPriceRange(minPrice, maxPrice);
      dispatch({ type: 'SET_ACTIVE_DEALS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Filter failed');
    }
  };

  const filterDealsByDiscount = async (minDiscount) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_FILTERS', payload: { minDiscount } });
      
      const response = await dealService.getDealsByMinDiscount(minDiscount);
      dispatch({ type: 'SET_ACTIVE_DEALS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Filter failed');
    }
  };

  const bookRoom = async (dealId) => {
    try {
      await dealService.bookRoom(dealId);
      toast.success('Room booked successfully!');
      
      // Refresh deals to update remaining rooms
      await fetchActiveDeals(state.pagination.page, state.pagination.size);
    } catch (error) {
      toast.error('Failed to book room');
      throw error;
    }
  };

  const cancelBooking = async (dealId) => {
    try {
      await dealService.cancelBooking(dealId);
      toast.success('Booking cancelled successfully!');
      
      // Refresh deals to update remaining rooms
      await fetchActiveDeals(state.pagination.page, state.pagination.size);
    } catch (error) {
      toast.error('Failed to cancel booking');
      throw error;
    }
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
    fetchActiveDeals();
  };

  const loadMore = () => {
    const nextPage = state.pagination.page + 1;
    if (nextPage < state.pagination.totalPages) {
      fetchActiveDeals(nextPage, state.pagination.size);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchActiveDeals();
    fetchUpcomingDeals();
  }, []);

  const value = {
    ...state,
    fetchActiveDeals,
    fetchUpcomingDeals,
    searchDeals,
    filterDealsByPrice,
    filterDealsByDiscount,
    bookRoom,
    cancelBooking,
    clearFilters,
    loadMore,
  };

  return (
    <DealContext.Provider value={value}>
      {children}
    </DealContext.Provider>
  );
};

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDeals must be used within a DealProvider');
  }
  return context;
};
