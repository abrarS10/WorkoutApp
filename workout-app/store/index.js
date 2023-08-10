import userReducer from './reducers/userReducer';
import workoutPlansReducer from './reducers/workoutPlansReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userReducer,
        workoutPlans: workoutPlansReducer
    },
});


export default store;