import axios from 'axios';

// ✅ Use environment variable or fallback to localhost
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/';

// 📦 Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Redirect to login and clear tokens
const redirectToLogin = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

// 🛡️ Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Handle token refresh when 401 is encountered
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh/')
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        console.warn('⚠️ No refresh token found. Redirecting to login.');
        redirectToLogin();
        return Promise.reject(error);
      }

      try {
        // <-- Changed here from axios.post to api.post
        const refreshResponse = await api.post('/auth/refresh/', {
          refresh: refreshToken,
        });

        const { access, refresh } = refreshResponse.data;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
