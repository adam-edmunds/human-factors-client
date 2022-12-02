import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Layout, Navbar } from '../';
import { Homepage, NotFound, Profile } from '../../pages';
import { login } from '../../redux/reducers/userReducer';
import { getUserData } from '../../utils/apiFunctions';

export const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(login(getUserData(user.email)));
    }
  });

  return isLoading ? (
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

          {isAuthenticated && (
            <Fragment>
              <Route path='profile' element={<Profile />} />
              <Route path='profile/edit' element={<h1>Hi There</h1>} />
            </Fragment>
          )}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
      <Outlet />
    </Router>
  );
};
