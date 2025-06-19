// src/components/DashboardLayout.jsx

import React from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet, useNavigate } from 'react-router-dom';
// Import logo from assets
import logo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';

const drawerWidth = 240;

function DashboardLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar (Top Navbar) */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Typography variant="h6" noWrap component="div" sx={{ bgcolor: 'primary.main', px: 1, borderRadius: 1 }}>
            Welcome, {user?.username || user?.name || 'User'}!
          </Typography>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={() => handleNavigation('/dashboard')}>
              Home
            </Button>
            <Button onClick={() => handleNavigation('/about')}>
              About Us
            </Button>
            <Button onClick={() => handleNavigation('/contact')}>
              Contact
            </Button>
          </Box>

          {/* Search Field */}
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              ),
            }}
            sx={{ mx: 2, maxWidth: 300 }}
          />

          <Button onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        {/* Sidebar Logo and Brand */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: -6, ml:-4, mb: 0, gap: 0 }}>
          <img src={logo} alt="Archivus Logo" style={{ width: 70, height: 55, borderRadius: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1, ml: 0 }}>
            Archivus
          </Typography>
        </Box>
        <Box sx={{ overflow: 'auto', p: 1 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/dashboard')}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/about')}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/contact')}>
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/profile')}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px` }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
