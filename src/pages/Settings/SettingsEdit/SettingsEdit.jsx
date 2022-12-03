import { Grid, Stack, Switch, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Container } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateRTA,
  updateTheme,
} from '../../../redux/reducers/settingsReducer';

export const SettingsEdit = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  console.log(settings);

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
              <Typography variant='h5' fontWeight={600}>
                {settings.zoom}
              </Typography>
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
              <Typography variant='h5' fontWeight={600}>
                {settings.colorBlindMode}
              </Typography>
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
