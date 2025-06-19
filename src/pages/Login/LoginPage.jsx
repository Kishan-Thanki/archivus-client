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
    setError('');

    // ✅ Client-side validation
    if (!identifier.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/auth/login/', {
        identifier,
        password,
      });

      const { tokens, user } = response.data || {};

      if (!tokens?.access || !tokens?.refresh || !user) {
        throw new Error('Missing tokens or user data in response.');
      }

      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('✅ Login successful:', user);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('❌ Login error:', err);

      if (err.status === 400 && err.errors) {
        const firstFieldError = Object.values(err.errors)[0][0];
        setError(firstFieldError || err.message || 'Invalid input');
      } else if (err.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
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
          disabled={isLoading || !identifier.trim() || !password.trim()}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
