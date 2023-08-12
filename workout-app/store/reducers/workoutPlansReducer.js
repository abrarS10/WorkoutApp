import { createSlice } from '@reduxjs/toolkit';
import workoutPlans from '../../data/workoutPlans';

const initialState = {
    plans: workoutPlans,
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
        addSelectedExercisesToDay: (state, action) => {
            const { planIndex, dayIndex, selectedExerciseIds } = action.payload;
            const dayExercises = state.plans[planIndex].workoutDays[dayIndex].exercises;

            dayExercises.push(...selectedExerciseIds.map((id) => ({ id, setPlan: [] })));
        },
        addDayToWorkoutPlan: (state, action) => {
            const {planIndex, newDay} = action.payload
            state.plans[planIndex].workoutDays.push(newDay);
        },
    }
})

export const {
    setWorkoutPlans,
    setPlanToBeEdited,
    setDayToBeEdited,
    updateWorkoutPlans,
    addSelectedExercisesToDay,
    addDayToWorkoutPlan,
} = workoutPlansSlice.actions;

export default workoutPlansSlice.reducer;