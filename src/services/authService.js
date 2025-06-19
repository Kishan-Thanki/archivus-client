import api from '../config/api';
import { API_ENDPOINTS } from '../config/constants';

export const AuthService = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  refreshToken: (refresh) => api.post(API_ENDPOINTS.AUTH.REFRESH, { refresh }),
  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT)
};