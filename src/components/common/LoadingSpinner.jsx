import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ size = 48 }) => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
    <CircularProgress size={size} color="primary" />
  </Box>
);

export default LoadingSpinner;