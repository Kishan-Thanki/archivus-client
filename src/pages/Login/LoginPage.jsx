import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login/', {
        identifier,
        password,
      });

      console.log('Login response full:', response);
      console.log('Login response data:', response.data);

      // Adjust according to the actual response shape:
      const { access, refresh, user, tokens } = response.data || {};

      // Support both possible shapes: either tokens object or direct access/refresh
      const accessToken = access || tokens?.access;
      const refreshToken = refresh || tokens?.refresh;

      if (!accessToken || !refreshToken || !user) {
        throw new Error('Missing tokens or user data in response.');
      }

      // Save tokens and user data in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('✅ Login successful:', user);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('❌ Login error:', err);

      if (err.response) {
        if (err.response.status === 400) {
          setError('Invalid input provided.');
        } else if (err.response.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('Something went wrong. Please try again later.');
        }
      } else {
        setError('Unable to connect to server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-form">
      <Paper elevation={13} sx={{ p: 5, maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            label="Email"
            type="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Link
              component="button"
              variant="body2"
              onClick={handleForgotPassword}
              underline="hover"
            >
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Box display="flex" justifyContent="center" mt={2}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/signup')}
              underline="hover"
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>
    </div >
  );
};

export default LoginForm;
