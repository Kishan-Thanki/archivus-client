// src/pages/NotFoundPage/NotFoundPage.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function NotFoundPage() {
  return (
    <div className="center">

      <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh', // Adjust as needed
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '6rem', fontWeight: 700, color: 'primary.main' }}>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The page you are looking for does not exist or has been moved.
          </Typography>
          {/* You might add a button to go back to home here */}
          <Button variant="contained" sx={{ mt: 3 }} component={Link} to="/">
          Go to Home
        </Button>
        </Box>
      </Container>
    </div>

  );
}

export default NotFoundPage;