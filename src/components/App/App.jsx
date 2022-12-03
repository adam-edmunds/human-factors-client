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
import { Layout, Navbar } from '../';
import { Homepage, NotFound, Profile, Settings } from '../../pages';
import { login } from '../../redux/reducers/userReducer';
import { getUserData } from '../../utils/apiFunctions';
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
            <Typography variant='h4' color='primary.main' mb={4}>
              Loading...
            </Typography>
            <CircularProgress />
          </Grid>
        </Container>
      ) : (
        <Router>
          <Navbar />
          <Layout>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/settings' element={<Settings />} />

              {isAuthenticated && (
                <Fragment>
                  <Route path='profile' element={<Profile />} />
                </Fragment>
              )}

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Layout>
          <Outlet />
        </Router>
      )}
    </ThemeProvider>
  );
};
