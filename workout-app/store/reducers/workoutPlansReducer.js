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
        deleteExerciseFromDay: (state, action) => {
            const {planIndex, dayIndex, exerciseId} = action.payload

            const day = state.plans[planIndex].workoutDays[dayIndex];

            day.exercises = day.exercises.filter(exercise => exercise.id != exerciseId)
        },
        addDayToWorkoutPlan: (state, action) => {
            const {planIndex, newDay} = action.payload
            state.plans[planIndex].workoutDays.push(newDay);
        },
        deleteDayFromWorkoutPlan: (state, action) => {
            const {planIndex, dayIndex} = action.payload;

            if (planIndex !== -1) {
                const remainingDays = state.plans[planIndex].workoutDays;

                if (dayIndex !== -1 && dayIndex < remainingDays.length) {
                    // Remove the day
                    remainingDays.splice(dayIndex, 1);

                    // Update weekday property of the remaining days
                    for (let i = dayIndex; i < remainingDays.length; i++) {
                        remainingDays[i].weekDay = i + 1;
                    }
                }
            }
        }
    }
})

export const {
    setWorkoutPlans,
    setPlanToBeEdited,
    setDayToBeEdited,
    updateWorkoutPlans,
    addSelectedExercisesToDay,
    deleteExerciseFromDay,
    addDayToWorkoutPlan,
    deleteDayFromWorkoutPlan,
} = workoutPlansSlice.actions;

export default workoutPlansSlice.reducer;