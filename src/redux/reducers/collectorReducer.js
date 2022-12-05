import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collectors: [],
};

const collectorSlice = createSlice({
  name: 'COLLECTORS',
  initialState,
  reducers: {
    loadCollectors(state, action) {
      state.collectors = action.payload;
    },
  },
});

export const { loadCollectors } = collectorSlice.actions;
export default collectorSlice.reducer;
