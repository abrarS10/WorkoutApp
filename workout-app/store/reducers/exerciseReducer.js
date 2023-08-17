import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_URL from '../../api/urls'
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

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [],
    status: 'idle', // possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default exerciseSlice.reducer;

