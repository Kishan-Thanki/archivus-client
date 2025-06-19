import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Inventory as ProductsIcon,
  Settings as SettingsIcon,
  Mail as MailIcon,
  ChatBubble as ChatIcon,
  Assessment as ReportsIcon,
} from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';

const sidebarConfig = [
  {
    title: 'Main',
    items: [
      {
        icon: <DashboardIcon />,
        text: 'Dashboard',
        path: '/dashboard',
        roles: ['Administrators', 'Staff', 'Students'] // Example
      },
      {
        icon: <MailIcon />,
        text: 'Messages',
        path: '/messages'
      }
    ]
  },
  {
    title: 'Management',
    icon: <PeopleIcon />,
    items: [
      {
        icon: <UsersIcon />,
        text: 'Users',
        path: '/users'
      },
      {
        icon: <ProductsIcon />,
        text: 'Products',
        path: '/products',
        items: [
          {
            text: 'List',
            path: '/products/list'
          },
          {
            text: 'Create',
            path: '/products/create'
          }
        ]
      }
    ]
  },
  {
    title: 'System',
    items: [
      {
        icon: <SettingsIcon />,
        text: 'Settings',
        path: '/settings'
      }
    ]
  }
];

export default sidebarConfig;