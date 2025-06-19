import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <Box className="center" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={13} sx={{ p: 5, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom align="center">
          Forgot Password
        </Typography>
        {submitted ? (
          <Alert severity="success">If this email is registered, a password reset link has been sent.</Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage; 