import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';

export const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 250,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999,
        }}
      >
        <Fab
          color='secondary'
          size='small'
          aria-label='scroll back to top'
          sx={{
            backgroundColor: '#E5E5E5',
            transition: '0.5s ease-in-out',
            color: 'black',
            '&:hover': { backgroundColor: '#BDBDBD' },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};
