import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    isActive: false
  },
  reducers: {
    toggleHeader(state) {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggleHeader } = headerSlice.actions;
export default headerSlice.reducer;
