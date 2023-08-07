import userReducer from './reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});


export default store;