import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { LayoutProvider } from './LayoutContext';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
  <LayoutProvider>
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Toolbar /> {/* For spacing below AppBar */}
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  </LayoutProvider>
);

export default DashboardLayout;