import axios from 'axios';
import { 
  API_BASE_URL, 
  API_CONFIG, 
  AUTH, 
  STORAGE_KEYS, 
  HTTP_STATUS,
  API_ENDPOINTS
} from './constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers[AUTH.TOKEN_HEADER_KEY] = `${AUTH.TOKEN_PREFIX}${token}`;
  }
  return config;
});

// Exclude token refresh for these endpoints
const EXCLUDED_REFRESH_PATHS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.REFRESH,
];

// Response Interceptor
api.interceptors.response.use(
  (response) =>
    response.data?.success
      ? { ...response, data: response.data.data }
      : response,

  async (error) => {
    const originalRequest = error.config;

    // Network/Timeout Errors
    if (!error.response || error.code === 'ECONNABORTED') {
      throw {
        message: !error.response ? 'Network error' : 'Request timeout',
        isNetworkError: true,
      };
    }

    // Token Refresh Handling (only for protected routes)
    const isUnauthorized = error.response.status === HTTP_STATUS.UNAUTHORIZED;
    const isNotRetry = !originalRequest._retry;
    const isNotExcludedPath = !EXCLUDED_REFRESH_PATHS.some(path =>
      originalRequest.url.includes(path)
    );

    if (isUnauthorized && isNotRetry && isNotExcludedPath) {
      return handleTokenRefresh(originalRequest);
    }

    throw normalizeError(error);
  }
);

// Token Refresh Handler
let isRefreshing = false;
let refreshQueue = [];

const handleTokenRefresh = async (originalRequest) => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push((newToken) => {
        originalRequest.headers[AUTH.TOKEN_HEADER_KEY] = `${AUTH.TOKEN_PREFIX}${newToken}`;
        resolve(api(originalRequest));
      });
    });
  }

  isRefreshing = true;
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

  if (!refreshToken) {
    clearAuthData();
    throw { requiresLogin: true };
  }

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
      { refresh: refreshToken }
    );

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh);

    refreshQueue.forEach((cb) => cb(data.access));
    refreshQueue = [];
    return api(originalRequest);
  } catch (error) {
    clearAuthData();
    throw { requiresLogin: true };
  } finally {
    isRefreshing = false;
  }
};

// Helpers
const clearAuthData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};

// Fixed normalizeError
const normalizeError = (error) => {
  const { response } = error;

  if (response) {
    const data = response.data;

    return {
      message:
        (typeof data === 'string' && data) || 
        (typeof data === 'object' && data.message) ||
        'Request failed',
      errors: (typeof data === 'object' && data.errors) || {},
      status: response.status,
      isClientError: response.status >= 400 && response.status < 500,
    };
  }

  return {
    message: error.message || 'Something went wrong',
    status: error?.response?.status,
  };
};

// Convenience Methods
export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const put = (url, data, config) => api.put(url, data, config);
export const del = (url, config) => api.delete(url, config);

export default api;
