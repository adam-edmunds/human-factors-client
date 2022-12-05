import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: true,
  zoom: 0,
  colorBlindMode: 'None',
  readTextAloud: false,
};

const settingsSlice = createSlice({
  name: 'SETTINGS',
  initialState,
  reducers: {
    updateTheme(state, action) {
      state.isDark = action.payload;
    },
    updateZoom(state, action) {
      if (
        state.zoom + action.payload < 0 ||
        state.zoom + action.payload > 100
      ) {
        return;
      }
      state.zoom += action.payload;
      document.body.style.zoom = `${100 + state.zoom}%`;
    },
    updateColorBlindMode(state, action) {
      state.colorBlindMode = action.payload;
    },
    updateRTA(state, action) {
      state.readTextAloud = action.payload;
    },
  },
});

export const { updateTheme, updateRTA, updateColorBlindMode, updateZoom } =
  settingsSlice.actions;
export default settingsSlice.reducer;
