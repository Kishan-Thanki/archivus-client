import { Drawer, Toolbar, Divider, useMediaQuery } from '@mui/material';
import NavSections from './NavSection';
import { useLayout } from '../LayoutContext';

const drawerWidth = { xs: 200, sm: 240, md: 280 };

const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useLayout();
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));

  return (
    <Drawer
      variant={isDesktop ? 'persistent' : 'temporary'}
      open={sidebarOpen}
      onClose={closeSidebar}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
          background: (theme) => theme.palette.background.paper,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        {/* Optional sidebar header (logo or title) */}
      </Box>
      <Divider />
      <NavSections />
    </Drawer>
  );
};

export default Sidebar;