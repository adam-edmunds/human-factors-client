import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: true,
  zoom: 0,
  colorBlindMode: false,
  readTextAloud: false,
};

const settingsSlice = createSlice({
  name: 'SETTINGS',
  initialState,
  reducers: {
    updateTheme(state, action) {
      state.isDark = action.payload;
    },
    updateRTA(state, action) {
      state.readTextAloud = action.payload;
    },
  },
});

export const { updateTheme, updateRTA } = settingsSlice.actions;
export default settingsSlice.reducer;
