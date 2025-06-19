// src/pages/NotFoundPage/NotFoundPage.jsx

import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/constants';

const NotFoundPage = () => (
  <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
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
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        component={Link}
        to={ROUTES.DASHBOARD}
      >
        Go to Dashboard
      </Button>
    </Box>
  </Container>
);

export default NotFoundPage;