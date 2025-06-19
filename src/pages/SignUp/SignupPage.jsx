// src/pages/SignUp/SignupPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI Imports
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
  Snackbar,
} from '@mui/material';

import { registerUser } from '../../services/authService.js';
import { fetchDegreeLevels, fetchPrograms } from '../../services/lookupService.js';

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // For Snackbar
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
        console.error("Error loading dropdown data:", err);
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
      [name]: value,
    }));
  };

  const isEmailValid = (email) => {
    return email.endsWith('@dau.ac.in');
  };

  const isPasswordValid = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return uppercaseRegex.test(password) && specialCharRegex.test(password);
  };

  const isEnrollmentYearValid = (year) => {
    return parseInt(year, 10) > 2019;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email domain check
    if (!isEmailValid(formData.email)) {
      setError({ message: 'Invalid email domain. Use @dau.ac.in email.' });
      return;
    }

    // Password domain check
    if (!isPasswordValid(formData.password)) {
      setError({ message: 'Password must contain at least one uppercase letter and one special character.' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError({ message: "Passwords do not match!" });
      return;
    }

    // Enrollement Year
    if (!isEnrollmentYearValid(formData.enrollment_year)) {
      setError({ message: 'Enrollment year must be greater than 2019.' });
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
      username: formData.username || null,
      enrollment_year: parseInt(formData.enrollment_year, 10),
      degree_level: formData.degree_level || null,
      program_id: formData.program_id ? parseInt(formData.program_id, 10) : null,
    };

    try {
      const response = await registerUser(payload);
      console.log('Registration successful:', response);
      localStorage.setItem('accessToken', response.tokens.access);
      localStorage.setItem('refreshToken', response.tokens.refresh);
      setSuccess(true); // Show success Snackbar
      setTimeout(() => navigate('/dashboard'), 2000); // Navigate after 2 sec
    } catch (err) {
      console.error('Registration failed:', err);
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

  if (dropdownLoading) {
    return (
      <div className='center'>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress size={80} sx={{ color: 'primary.main' }} />
          <Typography variant="h6" mt={2} color="text.secondary">Loading registration form...</Typography>
        </Box>
      </div>
    );
  }

  if (dropdownError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {dropdownError}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <div className='signup-form'>
        <Box sx={{ bgcolor: 'grey.50', p: 2, minHeight: '100vh' }}>
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              maxWidth: 600,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 'lg',
              boxShadow: 3,
              bgcolor: 'background.paper',
              width: '100%',
              mx: 'auto',
              mt: 8,
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1" textAlign="center" mb={6}>
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ '& > :not(style)': { mb: 3 } }}>

                {error && error.message && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    <AlertTitle>Registration Error</AlertTitle>
                    {error.message}
                  </Alert>
                )}

                {/* Email */}
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={formData.email !== '' && !isEmailValid(formData.email)}
                  helperText={
                    formData.email !== '' && !isEmailValid(formData.email)
                      ? 'Invalid email domain. Use @dau.ac.in email.'
                      : ''
                  }
                />

                {/* Password */}
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={formData.password !== '' && !isPasswordValid(formData.password)}
                  helperText={
                    formData.password !== '' && !isPasswordValid(formData.password)
                      ? 'At least 1 uppercase & 1 special character required.'
                      : ''
                  }
                />

                {/* Confirm Password */}
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={formData.confirmPassword !== '' && formData.password !== formData.confirmPassword}
                  helperText={
                    formData.confirmPassword !== '' && formData.password !== formData.confirmPassword
                      ? "Passwords do not match"
                      : ""
                  }
                />

                {/* Username */}
                <TextField
                  fullWidth
                  label="Username (Optional)"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!error?.fieldErrors?.username}
                  helperText={error?.fieldErrors?.username && error.fieldErrors.username[0]}
                />

                {/* Enrollment Year */}
                <TextField
                  fullWidth
                  label="Enrollment Year"
                  type="number"
                  name="enrollment_year"
                  value={formData.enrollment_year}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={formData.enrollment_year !== '' && !isEnrollmentYearValid(formData.enrollment_year)}
                  helperText={
                    formData.enrollment_year !== '' && !isEnrollmentYearValid(formData.enrollment_year)
                      ? 'Enrollment year must be greater than 2019.'
                      : ''
                  }
                />

                {/* Degree Level Dropdown */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="degree-level-label">Degree Level (Optional)</InputLabel>
                  <Select
                    labelId="degree-level-label"
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

                {/* Program Dropdown */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="program-id-label">Program (Optional)</InputLabel>
                  <Select
                    labelId="program-id-label"
                    name="program_id"
                    value={formData.program_id}
                    onChange={handleChange}
                    label="Program (Optional)"
                    error={!!error?.fieldErrors?.program_id}
                    disabled={formData.degree_level === ''} // 💥 This disables Program if no Degree Level selected
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


                {/* Sign Up Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 1, py: 1.5 }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                </Button>
                <Typography variant="body2" color="text.secondary" align="center" mt={-1}>
                  <Button
                    variant="text"
                    onClick={() => navigate('/login')}
                    sx={{
                      textTransform: 'none',
                      ":hover": {
                        textDecoration: 'underline',
                        backgroundColor: 'transparent',
                      }
                    }}
                  >
                    Already have and account? Login
                  </Button>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>

        {/* Snackbar for success */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          message="Registration successful! Redirecting..."
        />
      </div>
    </>
  );
}

export default SignupPage;