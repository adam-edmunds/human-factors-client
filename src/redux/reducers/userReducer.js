import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    login(state, action) {
      state.data = action.payload;
    },
    logout(state) {
      state.data = {};
    },
    updateUser(state, action) {
      state.data = action.payload;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
