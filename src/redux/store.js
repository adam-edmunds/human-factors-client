import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './reducers/settingsReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
