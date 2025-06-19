import { useState } from 'react';
import { 
  Badge, 
  Menu, 
  MenuItem, 
  IconButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/FiberManualRecord';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const notifications = [
    { id: 1, text: 'New message from John', time: '5 mins ago', read: false },
    { id: 2, text: 'System update available', time: '2 hours ago', read: true },
  ];

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={handleClick}
        sx={{ p: 1 }}
      >
        <Badge 
          badgeContent={notifications.filter(n => !n.read).length} 
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxWidth: '100%',
            maxHeight: 400,
            overflow: 'auto',
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        
        {notifications.length === 0 ? (
          <MenuItem>
            <Typography color="text.secondary">No notifications</Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                {!notification.read && (
                  <CircleIcon color="primary" sx={{ fontSize: 10 }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={notification.text}
                secondary={notification.time}
                primaryTypographyProps={{
                  fontWeight: notification.read ? 'normal' : 'bold'
                }}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default Notifications;