import { useAuth0 } from '@auth0/auth0-react';
import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Navbar } from '../';
import {
  Homepage,
  NotFound,
  Overview,
  Profile,
  Schedules,
  Settings,
  Route as RoutePage,
  Collectors,
  Collector,
} from '../../pages';
import { loadCollectors } from '../../redux/reducers/collectorReducer';
import { loadData } from '../../redux/reducers/scheduleReducer';
import { login } from '../../redux/reducers/userReducer';
import {
  getCollectors,
  getSchedule,
  getUserData,
} from '../../utils/apiFunctions';
import darkTheme from '../../utils/themes/Dark';
import lightTheme from '../../utils/themes/Light';

export const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const currentTheme = useSelector((state) => state.settings.isDark);
  const theme = currentTheme ? darkTheme : lightTheme;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(login(getUserData(user.email)));
      dispatch(loadData(getSchedule('2022-12-01')));
      dispatch(loadCollectors(getCollectors()));
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading ? (
        <Container>
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            style={{ minHeight: '100vh' }}
          >
            <Typography variant='h4' color='primary.title' mb={4}>
              Loading...
            </Typography>
            <CircularProgress sx={{ color: 'primary.title' }} />
          </Grid>
        </Container>
      ) : (
        <Router>
          <Navbar>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/settings' element={<Settings />} />

              {isAuthenticated && (
                <Fragment>
                  <Route path='profile' element={<Profile />} />
                  <Route path='/schedules' element={<Schedules />} />
                  <Route path='/overview' element={<Overview />} />
                  <Route path='/route/:id' element={<RoutePage />} />
                  <Route path='/collectors' element={<Collectors />} />
                  <Route path='/collector/:id' element={<Collector />} />
                </Fragment>
              )}

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Navbar>
          <Outlet />
        </Router>
      )}
    </ThemeProvider>
  );
};
