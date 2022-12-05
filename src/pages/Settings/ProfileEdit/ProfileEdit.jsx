import { useAuth0 } from '@auth0/auth0-react';
import { Badge, capitalize, Grid, Stack, Typography } from '@mui/material';
import { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../../../components';
import useSpeechSynthesis from '../../../hooks/useSpeechSysthesis/useSpeechSysthesis';

export const ProfileEdit = () => {
  const { user } = useAuth0();
  const isDark = useSelector((state) => state.settings.isDark);
  const readTextAloud = useSelector((state) => state.settings.readTextAloud);
  const inputFile = useRef(null);

  const { speak, cancel } = useSpeechSynthesis();

  const onBadgeClick = () => {
    inputFile.current.click();
  };
  return (
    <Fragment>
      <Typography
        variant='h4'
        fontWeight={600}
        pt={2}
        pl={1}
        sx={{ wordBreak: 'break-all' }}
        onMouseOver={() => readTextAloud && speak({ text: 'user profile' })}
        onMouseOut={() => cancel()}
      >
        User Profile
      </Typography>
      <Container mt={1}>
        <Grid container>
          <Grid item xs={12} lg={4}>
            <Stack p={2} spacing={2}>
              <Stack direction='row' spacing={2}>
                <Typography
                  variant='h5'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'first name' })
                  }
                  onMouseOut={() => cancel()}
                >
                  First name:
                </Typography>
                <Typography
                  variant='h6'
                  fontWeight={500}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: user.given_name })
                  }
                  onMouseOut={() => cancel()}
                >
                  {capitalize(user.given_name)}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={2}>
                <Typography
                  variant='h5'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'last name' })
                  }
                  onMouseOut={() => cancel()}
                >
                  Last name:
                </Typography>
                <Typography
                  variant='h6'
                  fontWeight={500}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: user.family_name })
                  }
                  onMouseOut={() => cancel()}
                >
                  {capitalize(user.family_name)}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid container item xs={12} lg={8} justifyContent='flex-end'>
            <Badge
              badgeContent='Edit'
              color='primary'
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClick={() => onBadgeClick()}
              onMouseOver={() =>
                readTextAloud &&
                speak({ text: 'Click to change profile picture' })
              }
              onMouseOut={() => cancel()}
              sx={{
                '& .MuiBadge-badge': {
                  color: 'white',
                  backgroundColor: 'grey',
                  minWidth: '50px',
                  transition: '0.25s',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#5F616F',
                    transition: '0.25s',
                    cursor: 'pointer',
                  },
                },
              }}
            >
              <input
                type='file'
                id='file'
                ref={inputFile}
                style={{ display: 'none' }}
              />
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
            </Badge>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
