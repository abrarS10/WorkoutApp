import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    selectedWorkoutPlan: 1,
    premiumMember: true,
    // Add other user-related data here
  },
  reducers: {
    setSelectedWorkoutPlan: (state, action) => {
      state.selectedWorkoutPlan = action.payload;
    },
    setPremiumMember: (state, action) => {
        state.premiumMember = action.payload;
    },
    // Add other reducers for other user data
  },
});

export const { setSelectedWorkoutPlan } = userSlice.actions;

export default userSlice.reducer;