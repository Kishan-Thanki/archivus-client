import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import { Box, Typography, Button } from '@mui/material';

const UnauthorizedPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="60vh"
    p={4}
    textAlign="center"
  >
    <Typography variant="h3" fontWeight={700} mb={2}>
      403 - Access Denied
    </Typography>
    <Typography mb={3}>
      You don't have permission to view this page
    </Typography>
    <Button
      variant="contained"
      color="primary"
      component={RouterLink}
      to={ROUTES.DASHBOARD}
    >
      Return to Dashboard
    </Button>
  </Box>
);

export default UnauthorizedPage;