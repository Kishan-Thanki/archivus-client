// src/pages/Dashboard/DashboardPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard!
      </Typography>
      <Typography variant="body1">
        This is where your main application content will go.
      </Typography>
      {/* Add your dashboard components here */}
    </Box>
  );
}

export default DashboardPage;