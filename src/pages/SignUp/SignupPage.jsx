// src/pages/SignUp/SignupPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
  MenuItem,
  TextField,
  Grid,
} from '@mui/material';
import { AuthService } from '../../services/authService.js';
import { fetchDegreeLevels, fetchPrograms } from '../../services/lookupService.js';
import './SignupPage.css';

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [degreeLevels, setDegreeLevels] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [dropdownLoading, setDropdownLoading] = useState(true);
  const [dropdownError, setDropdownError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    enrollment_year: '',
    degree_level: '',
    program_id: '',
  });

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        setDropdownLoading(true);
        setDropdownError(null);

        const [degreeLevelsData, programsData] = await Promise.all([
          fetchDegreeLevels(),
          fetchPrograms(),
        ]);

        setDegreeLevels(degreeLevelsData);
        setPrograms(programsData);
      } catch (err) {
        setDropdownError('Failed to load initial form data. Please try again.');
      } finally {
        setDropdownLoading(false);
      }
    };

    loadDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: typeof value === 'string' ? value.trimStart() : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';

    if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (!formData.enrollment_year) errors.enrollment_year = 'Enrollment year is required';
    else if (
      isNaN(formData.enrollment_year) ||
      formData.enrollment_year < 1900 ||
      formData.enrollment_year > new Date().getFullYear() + 5
    ) errors.enrollment_year = 'Enter a valid year';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError({ fieldErrors: errors, message: "Please fix the errors above." });
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
      username: formData.username || null,
      enrollment_year: parseInt(formData.enrollment_year),
      degree_level: formData.degree_level || null,
      program_id: formData.program_id ? parseInt(formData.program_id) : null,
    };

    try {
      const response = await AuthService.register(payload);
      localStorage.setItem('accessToken', response.tokens.access);
      localStorage.setItem('refreshToken', response.tokens.refresh);
      navigate('/dashboard');
      // Optionally show a Snackbar here for success
    } catch (err) {
      if (err.response && err.response.data) {
        setError({
          message: err.response.data.detail || 'Registration failed.',
          fieldErrors: err.response.data
        });
      } else {
        setError({ message: err.message || 'An unexpected error occurred during registration.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = !validateForm() || Object.keys(validateForm()).length === 0;

  if (dropdownLoading) {
    return (
      <Box className="signup-root">
        <CircularProgress size={80} sx={{ color: 'primary.main' }} />
        <Typography variant="h6" mt={2} color="text.secondary">Loading registration form data...</Typography>
      </Box>
    );
  }

  if (dropdownError) {
    return (
      <Box className="signup-root">
        <Alert severity="error" sx={{ width: 'fit-content' }}>
          <AlertTitle>Error</AlertTitle>
          {dropdownError}
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="signup-root">
      <Box
        className="signup-card"
        sx={{
          p: { xs: 1, sm: 2 },
          maxWidth: { xs: '100%', sm: 380 },
          width: '100%',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          textAlign="center"
          mb={3}
          sx={{ fontSize: { xs: '1.3rem', sm: '1.7rem' } }}
        >
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                error={!!error?.fieldErrors?.email}
                helperText={error?.fieldErrors?.email && error.fieldErrors.email[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username (Optional)"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                error={!!error?.fieldErrors?.username}
                helperText={error?.fieldErrors?.username && error.fieldErrors.username[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                error={!!error?.fieldErrors?.password}
                helperText={error?.fieldErrors?.password && error.fieldErrors.password[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Enrollment Year"
                type="number"
                id="enrollment_year"
                name="enrollment_year"
                value={formData.enrollment_year}
                onChange={handleChange}
                required
                variant="outlined"
                inputProps={{ min: "1900", max: (new Date().getFullYear() + 5).toString() }}
                error={!!error?.fieldErrors?.enrollment_year}
                helperText={error?.fieldErrors?.enrollment_year && error.fieldErrors.enrollment_year[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="degree-level-label">Degree Level (Optional)</InputLabel>
                <Select
                  labelId="degree-level-label"
                  id="degree_level_select"
                  name="degree_level"
                  value={formData.degree_level}
                  onChange={handleChange}
                  label="Degree Level (Optional)"
                  error={!!error?.fieldErrors?.degree_level}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {degreeLevels.map((level) => (
                    <MenuItem key={level.code} value={level.code}>
                      {level.name}
                    </MenuItem>
                  ))}
                </Select>
                {error?.fieldErrors?.degree_level && <Typography color="error" variant="caption">{error.fieldErrors.degree_level[0]}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="program-id-label">Program (Optional)</InputLabel>
                <Select
                  labelId="program-id-label"
                  id="program_id_select"
                  name="program_id"
                  value={formData.program_id}
                  onChange={handleChange}
                  label="Program (Optional)"
                  error={!!error?.fieldErrors?.program_id}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {programs.map((program) => (
                    <MenuItem key={program.id} value={program.id}>
                      {program.name} {program.degree_level_name ? `(${program.degree_level_name})` : ''}
                    </MenuItem>
                  ))}
                </Select>
                {error?.fieldErrors?.program_id && <Typography color="error" variant="caption">{error.fieldErrors.program_id[0]}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, py: 1.5 }}
                disabled={isLoading || !isFormValid}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2" color="text.secondary" align="center" mt={2}>
          Already have an account? <Button variant="text" onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>Login</Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignupPage;