import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import { useSelector } from 'react-redux';
import useSpeechSynthesis from '../../../hooks/useSpeechSysthesis/useSpeechSysthesis';

export const ScrollTop = () => {
  const readTextAloud = useSelector((state) => state.settings.readTextAloud);
  const { speak, cancel } = useSpeechSynthesis();

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
        onMouseOver={() =>
          readTextAloud &&
          speak({ text: 'click to go back to the top of the page' })
        }
        onMouseOut={() => cancel()}
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
