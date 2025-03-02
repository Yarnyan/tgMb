import { createSlice } from '@reduxjs/toolkit';

const stepsSlice = createSlice({
  name: 'steps',
  initialState: {
    currentStep: 1,
    currentStepChannel: 1,
    currentStepTeam: 1
  },
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    goToStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStepChannel: (state) => {
      state.currentStepChannel += 1;
    },
    prevStepChannel: (state) => {
      if (state.currentStepChannel > 1) state.currentStepChannel -= 1;
    },
    clearSteps: (state) => {
      state.currentStep = 1;
      state.currentStepChannel = 1;
    }
  },
});

export const { nextStep, prevStep, goToStep, nextStepChannel, prevStepChannel, clearSteps } = stepsSlice.actions;
export default stepsSlice.reducer;
