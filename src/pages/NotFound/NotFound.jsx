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
      <Typography variant='h1' style={{ color: '#FA8072' }}>
        404
      </Typography>
      <Typography variant='h6' style={{ color: 'white' }}>
        The page you're looking for doesn't exist.
      </Typography>

      <Link to='/' style={{ textDecoration: 'none', marginTop: 8 }}>
        <Button variant='contained' sx={{ fontWeight: 600 }}>
          Go to the home page
        </Button>
      </Link>
    </Box>
  );
};
