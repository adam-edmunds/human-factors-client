import { Button, Container, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSpeechSynthesis from '../../hooks/useSpeechSysthesis/useSpeechSysthesis';
import landingImage from '../../utils/images/landingImage.png';

export const Homepage = () => {
  const navigate = useNavigate();
  const { readTextAloud, colorBlindMode } = useSelector(
    (state) => state.settings
  );
  const { speak, cancel } = useSpeechSynthesis();

  return (
    <Container maxWidth='lg'>
      <Grid container mt={30}>
        <Grid container item xs={12} lg={7}>
          <Grid item xs={12}>
            <Typography
              variant='h3'
              fontWeight={600}
              sx={{
                letterSpacing: 1.25,
              }}
              onMouseOver={() =>
                readTextAloud &&
                speak({ text: 'Kengine, a simple scheduling app' })
              }
              onMouseOut={() => cancel()}
            >
              Kengine, a simple scheduling app
            </Typography>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Typography
              variant='body1'
              fontWeight={400}
              fontSize='1.12rem'
              onMouseOver={() =>
                readTextAloud && speak({ text: 'product description' })
              }
              onMouseOut={() => cancel()}
            >
              Kengine&#8482; simplifies the process of scheduling your employees
              by providing a central hub for all of your scheduling needs.
            </Typography>
          </Grid>
          <Grid item xs={12} mt={6}>
            <Grid container>
              <Grid item lg={4} xs={12}>
                <Button
                  variant='contained'
                  size='large'
                  sx={{
                    backgroundColor: colorBlindMode ? 'black' : '#0065e8',
                    color: 'white',
                    letterSpacing: 1.25,
                    textTransform: 'none',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: colorBlindMode ? '#1C1C1C' : '#4C98FA',
                    },
                  }}
                  onClick={() => navigate('/overview')}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({ text: 'click to navigate to overview page' })
                  }
                  onMouseOut={() => cancel()}
                >
                  <Typography variant='h6'>Get Started</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>
          {/* Image provided by https://lovepik.com/download/detail/450035737 */}
          <img
            src={landingImage}
            alt='Landing page icon'
            style={{ width: '100%' }}
            onMouseOver={() =>
              readTextAloud && speak({ text: 'homepage image' })
            }
            onMouseOut={() => cancel()}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
