import { configureStore } from '@reduxjs/toolkit';
import collectorReducer from './reducers/collectorReducer';
import scheduleReducer from './reducers/scheduleReducer';
import settingsReducer from './reducers/settingsReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    schedule: scheduleReducer,
    collectors: collectorReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
