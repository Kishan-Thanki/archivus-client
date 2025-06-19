import { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NavItem from './NavItem';
import sidebarConfig from './sidebarConfig.jsx';
import useAuth from '../../../hooks/useAuth';

const NavSection = ({ title, icon, items, depth = 0 }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ListItemButton 
        onClick={() => setOpen(!open)}
        sx={{ pl: 2 + depth * 2 }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            item.items ? (
              <NavSection 
                key={item.title}
                depth={depth + 1}
                {...item}
              />
            ) : (
              <NavItem 
                key={item.path}
                depth={depth + 1}
                {...item}
              />
            )
          ))}
        </List>
      </Collapse>
    </>
  );
};

const NavSections = () => {
  const { user } = useAuth();

  // Filter items by user role
  const filteredConfig = sidebarConfig.map(section => ({
    ...section,
    items: section.items.filter(item =>
      !item.roles || item.roles.includes(user?.role)
    )
  }));

  return (
    <>
      {filteredConfig.map(section => (
        <NavSection key={section.title} {...section} />
      ))}
    </>
  );
};

export default NavSections;