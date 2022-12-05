import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, IconButton, Stack, Switch, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../../components';
import useSpeechSynthesis from '../../../hooks/useSpeechSysthesis/useSpeechSysthesis';
import {
  updateColorBlindMode,
  updateRTA,
  updateTheme,
  updateZoom,
} from '../../../redux/reducers/settingsReducer';

export const SettingsEdit = () => {
  const { readTextAloud, zoom, isDark, colorBlindMode } = useSelector(
    (state) => state.settings
  );
  const dispatch = useDispatch();

  const { speak, cancel } = useSpeechSynthesis();

  return (
    <Fragment>
      <Typography
        variant='h4'
        fontWeight={600}
        pt={2}
        pl={1}
        sx={{ wordBreak: 'break-all' }}
        onMouseOver={() => readTextAloud && speak({ text: 'Settings' })}
        onMouseOut={() => cancel()}
      >
        Settings
      </Typography>
      <Container mt={1}>
        <Grid container p={2}>
          <Grid item xs={12} lg={6}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography
                variant='h5'
                fontWeight={600}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'Zoom Scale' })
                }
                onMouseOut={() => cancel()}
              >
                Zoom scale:
              </Typography>
              <Stack direction='row' spacing={1} alignItems='center'>
                <IconButton
                  onClick={() => {
                    dispatch(updateZoom(-10));
                    readTextAloud && speak({ text: 'Zoomed out by 10%' });
                  }}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'Click to zoom out 10%' })
                  }
                  onMouseOut={() => cancel()}
                >
                  <RemoveIcon sx={{ color: 'primary.title' }} />
                </IconButton>
                <Typography
                  variant='h5'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: `${zoom}% zoom` })
                  }
                  onMouseOut={() => cancel()}
                >
                  {zoom}%
                </Typography>
                <IconButton
                  onClick={() => {
                    dispatch(updateZoom(10));
                    readTextAloud && speak({ text: 'Zoomed in by 10%' });
                  }}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'Click to zoom in 10%' })
                  }
                  onMouseOut={() => cancel()}
                >
                  <AddIcon sx={{ color: 'primary.title' }} />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography
                variant='h5'
                fontWeight={600}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'Dark Mode' })
                }
                onMouseOut={() => cancel()}
              >
                Dark Mode:
              </Typography>
              <Switch
                checked={isDark}
                onChange={() => {
                  dispatch(updateTheme(!isDark));
                  readTextAloud && speak({ text: 'Toggled Dark Mode' });
                }}
                sx={{
                  '& .MuiSwitch-switchBase': {
                    color: 'primary.title',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'primary.title',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'primary.title',
                  },
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography
                variant='h5'
                fontWeight={600}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'Color Blind Mode' })
                }
                onMouseOut={() => cancel()}
              >
                Color Blind Mode:
              </Typography>
              <Switch
                checked={colorBlindMode}
                onChange={() => dispatch(updateColorBlindMode(!colorBlindMode))}
                sx={{
                  '& .MuiSwitch-switchBase': {
                    color: 'primary.title',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'primary.title',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'primary.title',
                  },
                }}
              />
            </Stack>
          </Grid>
          <Grid container item xs={12} lg={6}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography
                variant='h5'
                fontWeight={600}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'Read text aloud' })
                }
                onMouseOut={() => cancel()}
              >
                Read Text Aloud:
              </Typography>
              <Switch
                checked={readTextAloud}
                onChange={() => dispatch(updateRTA(!readTextAloud))}
                sx={{
                  '& .MuiSwitch-switchBase': {
                    color: 'primary.title',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'primary.title',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'primary.title',
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
