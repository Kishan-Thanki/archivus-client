// Core Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/';

export const API_CONFIG = {
  TIMEOUT: 10000,
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000,
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    REFRESH: '/auth/refresh/',
    LOGOUT: '/auth/logout/'
  },
  USER: {
    PROFILE: '/user/me/'
  }
};

// Authentication Constants
export const AUTH = {
  TOKEN_HEADER_KEY: 'Authorization',
  TOKEN_PREFIX: 'Bearer '
};

// User Roles 
export const USER_ROLES = {
  ADMIN: 'Administrators',
  STAFF: 'Staff',
  STUDENT: 'Students',
  ACADEMIC_MANAGER: 'Academic Managers',
  DOCUMENT_REVIEWER: 'Document Reviewers',
};

// Storage Management
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
};

// Routing
export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
};

// HTTP Status 
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// User-Facing Messages
export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SESSION_EXPIRED: 'Session expired. Please log in again.',
  TOKEN_REFRESH_FAILED: 'Unable to refresh session. Please log in again.',
};

// UI Constants 
export const UI = {
  LOADING_DELAY: 300,
  TOAST_DURATION: 3000,
};