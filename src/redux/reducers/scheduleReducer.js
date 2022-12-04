import { createSlice } from '@reduxjs/toolkit';
import { getSchedule } from '../../utils/apiFunctions';

const initialState = { date: '2022-12-01', data: [] };

const scheduleSlice = createSlice({
  name: 'SCHEDULE',
  initialState,
  reducers: {
    loadData(state, action) {
      state.data = action.payload;
    },
    updateDate(state, action) {
      state.date = action.payload;
      state.data = getSchedule(action.payload);
    },
  },
});

export const { loadData, updateDate } = scheduleSlice.actions;
export default scheduleSlice.reducer;
