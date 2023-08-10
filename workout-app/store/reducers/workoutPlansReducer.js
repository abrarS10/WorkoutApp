import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workoutPlans: [],
    planToBeEdited: null,
    dayToBeEdited: null,
}

const workoutPlansSlice = createSlice({
    name: 'workoutPlans',
    initialState,
    reducers: {
        setWorkoutPlans: (state, action) => {
            state.workoutPlans = action.payload;
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
} = workoutPlansSlice.actions;

export default workoutPlansSlice.reducer;