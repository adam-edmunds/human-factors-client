import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import landingImage from '../../utils/images/landingImage.png';

export const Homepage = () => {
  const navigate = useNavigate();

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
            >
              Kengine, a simple scheduling app
            </Typography>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Typography variant='body1' fontWeight={400} fontSize='1.12rem'>
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
                    backgroundColor: '#0065e8',
                    color: 'white',
                    letterSpacing: 1.25,
                    textTransform: 'none',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: '#4C98FA',
                    },
                  }}
                  onClick={() => navigate('/overview')}
                >
                  <Typography variant='h6'>Get Started</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>
          <img
            src={landingImage}
            alt='Landing page icon'
            style={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
