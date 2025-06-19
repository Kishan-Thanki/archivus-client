import { AppBar, Toolbar, IconButton, Box, Badge, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserMenu from './UserMenu';
import { useLayout } from '../LayoutContext';

const Header = () => {
  const { toggleSidebar } = useLayout();

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) => theme.palette.background.default,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2, md: 3 } }}>
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { lg: 'none' } }}
            aria-label="Open sidebar"
          >
            <MenuIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="h6"
              noWrap
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
            >
              MyApp
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="inherit" sx={{ p: 1 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;