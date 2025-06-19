import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">No user data found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
        {user.username && (
          <Typography variant="body1"><b>Username:</b> {user.username}</Typography>
        )}
        {/* Add more fields as needed */}
      </Paper>
    </Box>
  );
};

export default ProfilePage; 