import { createSlice } from '@reduxjs/toolkit';
import {router} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
const headerSlice = createSlice({
  name: 'header',
  initialState: {
    isActive: false
  },
  reducers: {
    toggleHeader(state) {
      state.isActive = !state.isActive;
    },
    logOut(state) {
      AsyncStorage.clear()
      router.push('/login');
    }
  },
});

export const { toggleHeader, logOut } = headerSlice.actions;
export default headerSlice.reducer;
