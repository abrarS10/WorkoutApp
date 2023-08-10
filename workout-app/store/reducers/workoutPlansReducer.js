import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    plans: [],
    planToBeEdited: null,
    dayToBeEdited: null,
}

const workoutPlansSlice = createSlice({
    name: 'workoutPlans',
    initialState,
    reducers: {
        setWorkoutPlans: (state, action) => {
            state.plans = action.payload;
        },
        updateWorkoutPlans: (state, action) => {
            return action.payload
        },
        setPlanToBeEdited: (state, action) => {
            state.planToBeEdited = action.payload;
        },
        setDayToBeEdited: (state, action) => {
            state.dayToBeEdited = action.payload;
        },
    }
})

export const {
    setWorkoutPlans,
    setPlanToBeEdited,
    setDayToBeEdited,
    updateWorkoutPlans,
} = workoutPlansSlice.actions;

export default workoutPlansSlice.reducer;