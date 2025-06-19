import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useLayout } from '../LayoutContext';

const NavItem = ({ icon, text, path, depth = 0 }) => {
  const { closeSidebar } = useLayout();
  const location = useLocation();
  const active = path === '/' ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <ListItemButton
      component={RouterLink}
      to={path}
      onClick={closeSidebar}
      selected={active}
      sx={{
        pl: 2 + depth * 2,
        borderRadius: 1,
        mx: 1,
        mb: 0.5,
        '&.Mui-selected': {
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
        '&.Mui-selected:hover': {
          bgcolor: 'action.selected',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 36 }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default NavItem;