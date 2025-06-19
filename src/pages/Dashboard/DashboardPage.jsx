// src/pages/Dashboard/DashboardPage.jsx

import { Box, Typography } from '@mui/material';

const DashboardPage = () => (
  <Box
    sx={{
      p: { xs: 2, sm: 3, md: 4 },
      width: '100%',
      maxWidth: { xs: '100%', md: 900 },
      mx: 'auto',
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      Welcome to your Dashboard!
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      This is where your main application content will go.
    </Typography>
  </Box>
);

export default DashboardPage;