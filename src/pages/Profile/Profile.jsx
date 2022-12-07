/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from '@auth0/auth0-react';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { NotificationCard } from './NotificationCard';

export const Profile = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const { colorBlindMode, readTextAloud, isDark } = useSelector(
    (state) => state.settings
  );
  const { speak, cancel } = useSpeechSynthesis();

  if (isEmpty(userData)) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Container mt={3}>
        <Stack>
          <Box
            height='7.5em'
            backgroundColor='primary.title'
            sx={{
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundImage: colorBlindMode
                ? `linear-gradient(90deg, lightgrey 0%, lightgrey 100%)`
                : `linear-gradient(to left, ${userData.colors.main}, ${userData.colors.secondary})`,
            }}
          >
            <Stack direction='row' justifyContent='space-between'>
              <Box
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'click to log out' })
                }
                onMouseOut={() => cancel()}
              >
                <Tooltip title='Logout'>
                  <IconButton
                    onClick={() => logout()}
                    sx={{ border: 1, m: '0.4em', borderRadius: '10px' }}
                  >
                    <LogoutIcon style={{ fontSize: '0.75em' }} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                onMouseOver={() =>
                  readTextAloud &&
                  speak({ text: 'click to navigate to edit profile' })
                }
                onMouseOut={() => cancel()}
              >
                <IconButton
                  onClick={() => navigate('/settings')}
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
                referrerPolicy='no-referrer'
                style={{
                  borderRadius: '50%',
                  border: `0.5em solid ${isDark ? '#33343B' : '#E9E9E9'}`,
                  backgroundColor: isDark ? '#33343B' : '#E9E9E9',
                  maxWidth: '7.5rem',
                  transform: 'translateY(-1.25em)',
                }}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'profile picture' })
                }
                onMouseOut={() => cancel()}
              />
              <Stack height={55}>
                <Typography
                  variant='h5'
                  fontWeight={500}
                  sx={{ wordBreak: 'break-all' }}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: user.name })
                  }
                  onMouseOut={() => cancel()}
                >
                  {user.name}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Grid container mt={4}>
        <Grid
          item
          xs={12}
          elevation={4}
          backgroundColor='primary.darkMedium'
          borderRadius={4}
          p={2}
          mb={2}
        >
          <Accordion
            elevation={0}
            sx={{
              backgroundColor: 'primary.darkMedium',
              '&::before': { backgroundColor: 'primary.darkMedium' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.title' }} />}
              elevation={0}
              aria-controls='panel1a-content'
            >
              <Stack direction='column'>
                <Typography
                  variant='h4'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'new notifications' })
                  }
                  onMouseOut={() => cancel()}
                >
                  New Notifications
                </Typography>
                <Typography
                  variant='subtitle'
                  color='primary.subtitle'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({ text: 'click to open new notifications' })
                  }
                  onMouseOut={() => cancel()}
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
              backgroundColor: 'primary.darkMedium',
              '&::before': { backgroundColor: 'primary.darkMedium' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.title' }} />}
              elevation={0}
              aria-controls='panel2a-content'
            >
              <Stack direction='column'>
                <Typography
                  variant='h4'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'old notifications' })
                  }
                  onMouseOut={() => cancel()}
                >
                  Old Notifications
                </Typography>
                <Typography
                  variant='subtitle'
                  color='primary.subtitle'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({ text: 'click to view old notifications' })
                  }
                  onMouseOut={() => cancel()}
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
