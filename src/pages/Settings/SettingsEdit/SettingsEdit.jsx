import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
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
  const settings = useSelector((state) => state.settings);
  const { readTextAloud } = settings;
  const dispatch = useDispatch();

  const { speak, cancel } = useSpeechSynthesis();

  const handleColorBlindChange = (event) => {
    dispatch(updateColorBlindMode(event.target.value));
    readTextAloud && speak({ text: 'Changed color blind mode' });
  };

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
                    readTextAloud && speak({ text: `${settings.zoom}% zoom` })
                  }
                  onMouseOut={() => cancel()}
                >
                  {settings.zoom}%
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
                checked={settings.isDark}
                onChange={() => {
                  dispatch(updateTheme(!settings.isDark));
                  readTextAloud && speak({ text: 'Toggled Dark Mode' });
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
              <FormControl sx={{ minWidth: '200px' }}>
                <Select
                  value={settings.colorBlindMode}
                  autoWidth
                  onChange={handleColorBlindChange}
                  sx={{
                    color: settings.isDark ? 'white' : 'black',
                    '& .MuiSelect-icon': {
                      fill: settings.isDark ? 'white' : 'black',
                    },
                  }}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({ text: 'Select color blind option' })
                  }
                  onMouseOut={() => cancel()}
                >
                  <MenuItem value='None' sx={{ color: 'black' }}>
                    None
                  </MenuItem>
                  <MenuItem value='Deuteranomaly' sx={{ color: 'black' }}>
                    Deuteranomaly
                  </MenuItem>
                  <MenuItem value='Protanomaly' sx={{ color: 'black' }}>
                    Protanomaly
                  </MenuItem>
                  <MenuItem
                    value='Protanopia / Deuteranopia'
                    sx={{ color: 'black' }}
                  >
                    Protanopia / Deuteranopia
                  </MenuItem>
                  <MenuItem value='Tritanomaly' sx={{ color: 'black' }}>
                    Tritanomaly
                  </MenuItem>
                  <MenuItem value='Tritanopia' sx={{ color: 'black' }}>
                    Tritanopia
                  </MenuItem>
                </Select>
              </FormControl>
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
                checked={settings.readTextAloud}
                onChange={() => dispatch(updateRTA(!settings.readTextAloud))}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
