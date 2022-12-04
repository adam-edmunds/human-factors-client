import { Auth0Provider } from '@auth0/auth0-react';
import { Slide } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin + '/profile'}
    >
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          TransitionComponent={Slide}
          hideIconVariant
          transitionDuration={{ exit: 200, enter: 200 }}
          autoHideDuration={1750}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
      </Provider>
    </Auth0Provider>
  </StrictMode>
);
