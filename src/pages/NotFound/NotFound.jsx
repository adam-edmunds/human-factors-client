import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

export const NotFound = () => {
  const { readTextAloud, colorBlindMode } = useSelector(
    (state) => state.settings
  );
  const { speak, cancel } = useSpeechSynthesis();

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
      <Typography
        variant='h1'
        sx={{ color: 'primary.salmon' }}
        onMouseOver={() => readTextAloud && speak({ text: 'four oh four' })}
        onMouseOut={() => cancel()}
      >
        404
      </Typography>
      <Typography
        variant='h6'
        sx={{ color: 'primary.title' }}
        align='center'
        onMouseOver={() =>
          readTextAloud &&
          speak({ text: "the page you're looking for doesn't exist" })
        }
        onMouseOut={() => cancel()}
      >
        The page you're looking for doesn't exist.
      </Typography>

      <Link
        to='/'
        style={{ textDecoration: 'none', marginTop: 8 }}
        onMouseOver={() =>
          readTextAloud && speak({ text: 'button to homepage' })
        }
        onMouseOut={() => cancel()}
      >
        <Button
          variant='contained'
          sx={{
            color: 'white',
            textTransform: 'none',
            backgroundColor: colorBlindMode ? 'black' : '#0065e8',
            letterSpacing: 1.25,
            width: '100%',
            '&:hover': {
              backgroundColor: colorBlindMode ? 'white' : '#4C98FA',
            },
          }}
        >
          <Typography variant='h6'>Go Back</Typography>
        </Button>
      </Link>
    </Box>
  );
};
