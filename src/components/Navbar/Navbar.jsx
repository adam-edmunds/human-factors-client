/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

export const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const [count, setCount] = useState(0);
  const [invisible, setInvisible] = useState(false);

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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#43444D',
        }}
      >
        <Fade in={true} timeout={1000}>
          <Container maxWidth='false' component='section'>
            <Toolbar disableGutters>
              <Box
                sx={{
                  flexGrow: { xs: 1 },
                  display: { xs: 'flex' },
                }}
              >
                <Typography
                  variant='h4'
                  fontWeight={600}
                  component='div'
                  color='white'
                >
                  Kengine
                </Typography>
                <Clock />
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
                          referrerpolicy: 'no-referrer',
                        }}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </Fade>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
        PaperProps={{ sx: { backgroundColor: '#33343B', color: 'white' } }}
      >
        <Toolbar />
        <List>
          {defaultPages.map((text, index) => (
            <ListItem
              key={text}
              component={NavLink}
              to={defaltPageLinks[index]}
              disablePadding
              sx={{
                color: 'white',
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'white' }}>
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
          <ListItem
            component={NavLink}
            to='/settings'
            disablePadding
            sx={{
              color: 'white',
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
          {isAuthenticated ? (
            <Fragment>
              <ListItem
                component={NavLink}
                to='/profile'
                disablePadding
                sx={{
                  color: 'white',
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </ListItemButton>
              </ListItem>
              <ListItem
                onClick={() => logout()}
                disablePadding
                sx={{
                  color: 'white',
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>
            </Fragment>
          ) : (
            <ListItem
              onClick={() => loginWithRedirect()}
              disablePadding
              sx={{
                color: 'white',
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'white' }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Login' />
              </ListItemButton>
            </ListItem>
          )}
          <Divider sx={{ bgcolor: '#CACACA', mt: 1 }} variant='middle' />
          <ListItemText sx={{ textAlign: 'center' }}>
            <Typography variant='body2'>v 0.0.1 | KENGINE</Typography>
          </ListItemText>
        </List>
      </Drawer>
      <ScrollTop />
    </Box>
  );
};
