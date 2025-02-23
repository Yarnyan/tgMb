import { createSlice } from '@reduxjs/toolkit';

interface IProfile {
  avatar: string;
  id: number;
  privacySettingsId: number;
  username: string;
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    currentStep: 1,
    profileVisible: true,
    phoneVisible: true, 
    profile: {} as IProfile
  },
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    setProfileVisible: (state, action) => {
      state.profileVisible = action.payload;
    },
    setPhoneVisible: (state, action) => {
      state.phoneVisible = action.payload;
    },
    setProfileInfo: (state, action) => {
      state.profile = action.payload;
    }
  },
});

export const { nextStep, prevStep, setProfileVisible, setPhoneVisible, setProfileInfo} = profileSlice.actions;
export default profileSlice.reducer;