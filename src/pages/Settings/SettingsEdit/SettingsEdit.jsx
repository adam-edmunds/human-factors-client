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
  Tooltip,
  Typography
} from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../../components';
import {
  updateColorBlindMode,
  updateRTA,
  updateTheme,
  updateZoom
} from '../../../redux/reducers/settingsReducer';

export const SettingsEdit = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleColorBlindChange = (event) => {
    dispatch(updateColorBlindMode(event.target.value));
  };

  return (
    <Fragment>
      <Typography
        variant='h4'
        fontWeight={600}
        pt={2}
        pl={1}
        sx={{ wordBreak: 'break-all' }}
      >
        Settings
      </Typography>
      <Container mt={1}>
        <Grid container p={2}>
          <Grid item xs={12} lg={6}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h5' fontWeight={600}>
                Zoom scale:
              </Typography>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Tooltip title='Minus 10%' placement='top'>
                  <IconButton onClick={() => dispatch(updateZoom(-10))}>
                    <RemoveIcon sx={{ color: 'primary.title' }} />
                  </IconButton>
                </Tooltip>
                <Typography variant='h5' fontWeight={600}>
                  {settings.zoom}%
                </Typography>
                <Tooltip title='Add 10%' placement='top'>
                  <IconButton onClick={() => dispatch(updateZoom(10))}>
                    <AddIcon sx={{ color: 'primary.title' }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h5' fontWeight={600}>
                Dark Mode:
              </Typography>
              <Switch
                checked={settings.isDark}
                onChange={() => dispatch(updateTheme(!settings.isDark))}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h5' fontWeight={600}>
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
              <Typography variant='h5' fontWeight={600}>
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
