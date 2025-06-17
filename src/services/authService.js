import api from '../lib/api.js';

/**
 * Registers a new user.
 * @param {Object} userData - The user registration payload.
 * @returns {Promise<Object>} Response data including tokens and user info.
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  } catch (error) {
    console.error('❌ Registration failed:', error?.response?.data || error.message);
    throw error;
  }
};

/**
 * Logs in a user with provided credentials.
 * @param {{identifier: string, password: string}} credentials
 * @returns {Promise<Object>} JWT tokens and user details.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  } catch (error) {
    console.error('❌ Login failed:', error?.response?.data || error.message);
    throw error;
  }
};
