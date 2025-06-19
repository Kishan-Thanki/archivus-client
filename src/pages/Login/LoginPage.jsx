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
import { AuthService } from '../../services/authService';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ identifier: false, password: false });
  const navigate = useNavigate();

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const email = identifier.trim();
    const pwd = password.trim();

    if (!email || !pwd) {
      setError('Email and password are required.');
      return;
    }
    if (!isEmailValid(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.login({ identifier: email, password: pwd });
      const { tokens, user } = response.data || response;

      if (!tokens?.access || !tokens?.refresh || !user) {
        throw new Error('Missing tokens or user data in response.');
      }

      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      localStorage.setItem('user', JSON.stringify(user));

      window.location.href = '/dashboard';
    } catch (err) {
      // Debugging aid
      console.error('Login error:', err);

      const status = err.status;

      if (status === 400 && err.errors) {
        const firstFieldError = Object.values(err.errors)?.[0]?.[0];
        setError(firstFieldError || err.message || 'Invalid input');
      } else if (status === 401) {
        setError('Invalid email or password.');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const isFormValid = identifier.trim() && password.trim() && isEmailValid(identifier);

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
          onChange={(e) => {
            setIdentifier(e.target.value);
            setTouched((prev) => ({ ...prev, identifier: true }));
          }}
          fullWidth
          required
          margin="normal"
          error={touched.identifier && !!identifier && !isEmailValid(identifier)}
          helperText={
            touched.identifier && identifier && !isEmailValid(identifier)
              ? 'Enter a valid email address'
              : ''
          }
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setTouched((prev) => ({ ...prev, password: true }));
          }}
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
          disabled={isLoading || !isFormValid}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginPage;
