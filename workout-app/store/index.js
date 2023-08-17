import userReducer from './reducers/userReducer';
import workoutPlansReducer from './reducers/workoutPlansReducer';
import exerciseReducer from './reducers/exerciseReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userReducer,
        workoutPlans: workoutPlansReducer,
        exerciseList: exerciseReducer,
    },
});


export default store;