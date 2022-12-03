/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from '@auth0/auth0-react';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { isEmpty } from 'lodash';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCard } from './NotificationCard';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);

  if (isEmpty(userData)) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Grid container mt={3}>
        <Grid
          item
          xs={12}
          minHeight='15em'
          elevation={4}
          backgroundColor='#33343b'
          borderRadius={4}
        >
          <Stack>
            <Box
              height='7.5em'
              backgroundColor='white'
              sx={{
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundImage: `linear-gradient(to left, ${userData.colors.main}, ${userData.colors.secondary})`,
              }}
            >
              <Stack direction='row' justifyContent='space-between'>
                <Box>
                  <Tooltip title='Logout'>
                    <IconButton
                      onClick={() => logout()}
                      sx={{ border: 1, m: '0.4em', borderRadius: '10px' }}
                    >
                      <LogoutIcon style={{ fontSize: '0.75em' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => navigate('/profile/edit')}
                    sx={{ border: 1, m: '0.4em', borderRadius: '10px' }}
                  >
                    <EditIcon style={{ fontSize: '0.65em', marginRight: 5 }} />
                    <Typography
                      variant='body1'
                      fontWeight='bold'
                      sx={{ fontSize: '0.5em' }}
                    >
                      Edit Profile
                    </Typography>
                  </IconButton>
                </Box>
              </Stack>
            </Box>
            <Box backgroundColor='transparent' height={0}>
              <Stack
                direction='row'
                alignItems='center'
                spacing={2}
                pl={7.5}
                height={65}
              >
                <img
                  alt='User Profile'
                  src={user.picture}
                  referrerpolicy='no-referrer'
                  style={{
                    borderRadius: '50%',
                    border: '0.5em solid #33343b',
                    backgroundColor: '#33343b',
                    maxWidth: '7.5rem',
                    transform: 'translateY(-1.25em)',
                  }}
                />
                <Stack height={55}>
                  <Typography
                    variant='h5'
                    fontWeight={500}
                    sx={{ wordBreak: 'break-all' }}
                  >
                    {user.name}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container mt={4}>
        <Grid
          item
          xs={12}
          elevation={4}
          backgroundColor='#33343b'
          borderRadius={4}
          p={2}
          mb={2}
        >
          <Accordion
            elevation={0}
            sx={{
              backgroundColor: '#33343b',
              '&::before': { backgroundColor: '#33343b' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              elevation={0}
              aria-controls='panel1a-content'
            >
              <Stack direction='column'>
                <Typography variant='h4' fontWeight={600}>
                  New Notifications
                </Typography>
                <Typography
                  variant='subtitle'
                  color='lightgrey'
                  fontWeight={600}
                >
                  Open to view
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails elevation={0}>
              <Grid container spacing={2}>
                {userData.notifications.map((notification, index) => {
                  if (!notification.viewed) {
                    return (
                      <Grid item xs={12} lg={3} key={index}>
                        <NotificationCard
                          notification={notification}
                          index={index}
                        />
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={0}
            sx={{
              backgroundColor: '#33343b',
              '&::before': { backgroundColor: '#33343b' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              elevation={0}
              aria-controls='panel1a-content'
            >
              <Stack direction='column'>
                <Typography variant='h4' fontWeight={600}>
                  Old Notifications
                </Typography>
                <Typography
                  variant='subtitle'
                  color='lightgrey'
                  fontWeight={600}
                >
                  Open to view
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails elevation={0}>
              <Grid container spacing={2}>
                {userData.notifications.map((notification, index) => {
                  if (notification.viewed) {
                    return (
                      <Grid item xs={12} lg={3} key={index}>
                        <NotificationCard
                          notification={notification}
                          index={index}
                        />
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Fragment>
  );
};
