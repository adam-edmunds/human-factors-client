/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { drawerWidth } from '../../utils/constants';
import { Clock, ScrollTop } from './';

const Settings = () => {
  return (
    <ListItem
      component={NavLink}
      to='/settings'
      disablePadding
      sx={{
        color: 'primary.title',
      }}
    >
      <ListItemButton>
        <ListItemIcon sx={{ color: 'primary.title' }}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItemButton>
    </ListItem>
  );
};

export const Navbar = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const isDark = useSelector((state) => state.settings.isDark);
  const [count, setCount] = useState(0);
  const [invisible, setInvisible] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    let count = 0;
    if (!isEmpty(userData?.notifications)) {
      for (const notification of userData.notifications) {
        if (!notification.viewed) {
          count++;
        }
      }
      setCount(count);
      setInvisible(count === 0);
    }
  }, [userData]);

  const defaultPages = [
    'Homepage',
    'Daily Overview',
    'Schedules',
    'Collectors',
    'About',
  ];
  const defaltPageLinks = [
    '/',
    'overview',
    '/schedules',
    '/collectors',
    '/about',
  ];
  const defaultPageIcons = [
    <DashboardIcon />,
    <CalendarMonthIcon />,
    <ScheduleSendIcon />,
    <PeopleAltIcon />,
    <InfoIcon />,
  ];

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
      return;
    }
    loginWithRedirect();
  };

  const drawer = (
    <Fragment>
      <List>
        {defaultPages.map((text, index) => (
          <ListItem
            key={text}
            component={NavLink}
            to={defaltPageLinks[index]}
            disablePadding
            sx={{
              color: 'primary.title',
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: 'primary.title' }}>
                {defaultPageIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: '#CACACA' }} variant='middle' />
      <List
        sx={{
          position: 'fixed',
          width: drawerWidth,
          bottom: 0,
        }}
      >
        <Divider sx={{ bgcolor: '#CACACA', mb: 1 }} variant='middle' />
        {isAuthenticated ? (
          <Fragment>
            <ListItem
              component={NavLink}
              to='/profile'
              disablePadding
              sx={{
                color: 'primary.title',
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'primary.title' }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItemButton>
            </ListItem>
            <Settings />
            <ListItem
              onClick={() => logout()}
              disablePadding
              sx={{
                color: 'primary.title',
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'primary.title' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>
          </Fragment>
        ) : (
          <Fragment>
            <Settings />
            <ListItem
              onClick={() => loginWithRedirect()}
              disablePadding
              sx={{
                color: 'primary.title',
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'primary.title' }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Login' />
              </ListItemButton>
            </ListItem>
          </Fragment>
        )}
        <Divider sx={{ bgcolor: '#CACACA', mt: 1 }} variant='middle' />
        <ListItemText sx={{ textAlign: 'center' }}>
          <Typography variant='body2'>v 0.0.1 | KENGINE</Typography>
        </ListItemText>
      </List>
    </Fragment>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          ml: { md: `${drawerWidth}px` },
          backgroundColor: isDark ? '#43444D' : '#DADADA',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon sx={{ color: 'primary.title' }} />
          </IconButton>
          <Box
            sx={{
              flexGrow: { xs: 1 },
              display: { xs: 'flex' },
            }}
          >
            <Stack direction={{ md: 'row' }} spacing={{ md: 4 }}>
              <Typography
                variant='h4'
                fontWeight={600}
                component='div'
                color='primary.title'
              >
                Kengine
              </Typography>
              <Clock />
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isAuthenticated ? 'Profile' : 'Login'}>
              <IconButton sx={{ gap: 2 }} onClick={handleClick}>
                <Badge
                  badgeContent={count}
                  invisible={invisible}
                  overlap='circular'
                  color='notification'
                  sx={{
                    color: 'white',
                  }}
                >
                  <Avatar
                    alt='Default Image'
                    src={user?.picture}
                    imgProps={{
                      referrerPolicy: 'no-referrer',
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'primary.darkMedium',
              color: 'primary.title',
              pt: '82px',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'primary.darkMedium',
              color: 'primary.title',
            },
          }}
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar id='back-to-top-anchor' />
        {children}
      </Box>
      <ScrollTop />
    </Box>
  );
};
