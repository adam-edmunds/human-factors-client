import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '90vh',
      }}
    >
      <Typography variant='h1' sx={{ color: 'primary.salmon' }}>
        404
      </Typography>
      <Typography variant='h6' sx={{ color: 'primary.title' }} align='center'>
        The page you're looking for doesn't exist.
      </Typography>

      <Link to='/' style={{ textDecoration: 'none', marginTop: 8 }}>
        <Button
          variant='contained'
          sx={{
            color: 'white',
            textTransform: 'none',
            backgroundColor: '#0065e8',
            letterSpacing: 1.25,
            width: '100%',
            '&:hover': {
              backgroundColor: '#4C98FA',
            },
          }}
        >
          <Typography variant='h6'>Go Back</Typography>
        </Button>
      </Link>
    </Box>
  );
};
