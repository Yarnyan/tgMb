import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
const createGroupSlice = createSlice({
  name: 'create',
  initialState: {
    newGroup: {

    }
  },
  reducers: {
    setNewGroup: (state, action: PayloadAction<any>) => {
      state.newGroup = action.payload;
    },
  },
});

export const { setNewGroup } = createGroupSlice.actions;
export default createGroupSlice.reducer;
