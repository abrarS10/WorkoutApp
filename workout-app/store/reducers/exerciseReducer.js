import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_URL from '../../api/urls'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export const fetchExercises = createAsyncThunk('exercises/fetchExercises', async () => {
    try {
        const response = await axios.get(`${API_URL}/exercises`); // Make the API call
        return response.data;
    } catch (error) {
        console.error('Error fetching exercises', error);
        throw error;
    }
});

export const loadExercisesFromStorage = async () => {
    try {
        const exercisesJson = await AsyncStorage.getItem('exercises');
        return JSON.parse(exercisesJson);
    } catch (error) {
        console.error('Error loading exercises from local storage', error);
        return null;
    }
}

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [],
    status: 'idle', // possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setExercises: (state, action) => {
        state.exercises = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exercises = action.payload;

        //save fetched exercises to asyncstorage
        AsyncStorage.setItem('exercises', JSON.stringify(action.payload))
            .then(() => {
                console.log("Exercises saved to local storage");
            })
            .catch((error) => {
                console.error('Error saving execises to local storage', error)
            })
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
    setExercises,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;

