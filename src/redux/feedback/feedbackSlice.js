import { createSlice } from '@reduxjs/toolkit';
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        feedback: {
            feedbackCurrent: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        feedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        feedbackSuccess: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.error = false;
            state.feedback.feedbackCurrent = action.payload;
        },
        feedbackFailed: (state) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
        },
    },
});

export const { feedbackStart, feedbackSuccess, feedbackFailed } = feedbackSlice.actions;

export default feedbackSlice.reducer;
