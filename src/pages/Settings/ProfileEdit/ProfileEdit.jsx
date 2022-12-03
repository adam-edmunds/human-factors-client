import { useAuth0 } from '@auth0/auth0-react';
import { capitalize, Grid, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Container } from '../../../components';
import { useSelector } from 'react-redux';

export const ProfileEdit = () => {
  const { user } = useAuth0();
  const isDark = useSelector((state) => state.settings.isDark);

  return (
    <Fragment>
      <Typography
        variant='h4'
        fontWeight={600}
        pt={2}
        pl={1}
        sx={{ wordBreak: 'break-all' }}
      >
        User Profile
      </Typography>
      <Container mt={1}>
        <Grid container>
          <Grid item xs={12} lg={4}>
            <Stack p={2} spacing={2}>
              <Stack direction='row' spacing={2}>
                <Typography variant='h5' fontWeight={600}>
                  First name:
                </Typography>
                <Typography variant='h6' fontWeight={500}>
                  {capitalize(user.given_name)}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={2}>
                <Typography variant='h5' fontWeight={600}>
                  First name:
                </Typography>
                <Typography variant='h6' fontWeight={500}>
                  {capitalize(user.family_name)}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid container item xs={12} lg={8} justifyContent='flex-end'>
            <img
              alt='User Profile'
              src={user.picture}
              referrerPolicy='no-referrer'
              style={{
                borderRadius: '50%',
                border: `0.5em solid ${isDark ? '#33343B' : '#E9E9E9'}`,
                backgroundColor: isDark ? '#33343B' : '#E9E9E9',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
