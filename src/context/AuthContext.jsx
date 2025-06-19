// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/authService';
import { STORAGE_KEYS, ROUTES, AUTH_MESSAGES } from '../config/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Token validation
  const validateToken = useCallback((token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now() ? decoded : null;
    } catch {
      return null;
    }
  }, []);

  // Initialize auth state
  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      
      if (token && userData) {
        const isValid = validateToken(token);
        if (isValid) {
          setUser(JSON.parse(userData));
        }
      }
    } finally {
      setLoading(false);
    }
  }, [validateToken]);

  useEffect(() => { 
    initializeAuth(); 
  }, [initializeAuth]);

  // Login handler
  const login = async (credentials) => {
    try {
      setLoading(true);
      const { access, refresh, user: userData } = await AuthService.login(credentials);
      
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      
      setUser(userData);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      throw error.response?.data?.message || AUTH_MESSAGES.INVALID_CREDENTIALS;
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    setUser(null);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  // Role checker
  const hasRole = useCallback(
    (role) => user?.role === role,
    [user]
  );

  // Context value
  const contextValue = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};