// src/pages/SignUp/SignupPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Material UI Imports ---
import {
  Box,
  Button,
  FormControl,
  InputLabel, // Changed from FormLabel for Select
  Select,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
  MenuItem, // For options in Select
  TextField, // <-- This is the key change for text inputs
} from '@mui/material';

// Import services
import { registerUser } from '../../services/authService.js';
import { fetchDegreeLevels, fetchPrograms } from '../../services/lookupService.js';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError({ message: "Passwords do not match!" }); // Use internal error state
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
      const response = await registerUser(payload);
      console.log('Registration successful:', response);
      localStorage.setItem('accessToken', response.tokens.access);
      localStorage.setItem('refreshToken', response.tokens.refresh);
      navigate('/dashboard'); // Or navigate to a success page/login
      alert('Registration successful and logged in!'); // Consider MUI SnackBar/Toast for this
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
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={80} sx={{ color: 'primary.main' }} />
        <Typography variant="h6" mt={2} color="text.secondary">Loading registration form data...</Typography>
      </Box>
    );
  }

  if (dropdownError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error" sx={{ width: 'fit-content' }}>
          <AlertTitle>Error</AlertTitle>
          {dropdownError}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        p: 2,
      }}
    >
      <Box
        sx={{
          p: { xs: 4, sm: 6 },
          maxWidth: 'md',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'lg',
          boxShadow: 3,
          bgcolor: 'background.paper',
          width: '100%',
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
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined" // Use outlined variant for a clear border
              error={!!error?.fieldErrors?.email} // Boolean: true if there's an error
              helperText={error?.fieldErrors?.email && error.fieldErrors.email[0]}
            />

            {/* Password */}
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

            {/* Confirm Password */}
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
              // You could add a custom error here if passwords don't match client-side
              // error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
              // helperText={formData.password !== formData.confirmPassword && formData.confirmPassword !== '' ? "Passwords do not match" : ""}
            />

            {/* Username */}
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

            {/* Enrollment Year */}
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

            {/* Degree Level Dropdown */}
            <FormControl fullWidth variant="outlined"> {/* Add variant="outlined" to FormControl for consistent styling */}
              <InputLabel id="degree-level-label">Degree Level (Optional)</InputLabel>
              <Select
                labelId="degree-level-label" // Connects label to select
                id="degree_level_select"
                name="degree_level"
                value={formData.degree_level}
                onChange={handleChange}
                label="Degree Level (Optional)" // Label for the outlined variant
                // If you want a placeholder, you can make the first MenuItem empty and value=""
                // displayEmpty // Not strictly needed with 'label' prop for Outlined variant
                error={!!error?.fieldErrors?.degree_level}
              >
                <MenuItem value=""><em>None</em></MenuItem> {/* Placeholder with emphasis */}
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

            {/* Sign Up Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, py: 1.5 }}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <Typography variant="body2" color="text.secondary" align="center" mt={2}>
              Already have an account? <Button variant="text" onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>Login</Button>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default SignupPage;