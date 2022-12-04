import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './reducers/scheduleReducer';
import settingsReducer from './reducers/settingsReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    schedule: scheduleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
