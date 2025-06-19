import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Logout and redirect utility
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

// 👉 Attach access token
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

// ✅ Normalize and handle backend responses
api.interceptors.response.use(
  (response) => {
    const { data } = response;

    // ✅ Auto unwrap response if "success: true"
    if (data?.success) {
      return {
        ...response,
        data: data.data,       // Only pass the nested `data`
        message: data.message, // Pass message if needed
      };
    }

    // ❌ Unsuccessful (e.g., 400 but still structured)
    if (data?.success === false) {
      return Promise.reject({
        message: data.message || 'Request failed',
        errors: data.errors || {},
        status: response.status,
      });
    }

    // 🟨 Unexpected format
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 🔁 Refresh token if 401 (unauthorized)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh/')
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        logoutUser();
        return Promise.reject({ message: 'Session expired. Please log in again.' });
      }

      try {
        const refreshResponse = await axios.post(`${API_BASE_URL}auth/refresh/`, {
          refresh: refreshToken,
        });

        const { access, refresh } = refreshResponse.data.data;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();
        return Promise.reject({ message: 'Token refresh failed. Please log in again.' });
      }
    }

    // 🚫 Handle forbidden access
    if (error.response?.status === 403) {
      return Promise.reject({ message: 'Access denied', status: 403 });
    }

    // 🔴 Handle server errors
    if (error.response?.status >= 500) {
      return Promise.reject({ message: 'Server error. Please try again later.', status: 500 });
    }

    // ⚠️ Catch-all for structured errors
    const response = error.response?.data;
    if (response?.success === false) {
      return Promise.reject({
        message: response.message || 'Error occurred',
        errors: response.errors || {},
        status: error.response?.status,
      });
    }

    // 🔻 Unknown error fallback
    return Promise.reject({
      message: error.message || 'Something went wrong',
      status: error.response?.status,
    });
  }
);

export default api;
