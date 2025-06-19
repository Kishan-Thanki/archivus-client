import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} mt={1}>
        <Link href="#" color="inherit" underline="hover">
          Terms
        </Link>
        <Link href="#" color="inherit" underline="hover">
          Privacy
        </Link>
        <Link href="#" color="inherit" underline="hover">
          Contact
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;