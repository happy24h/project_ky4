import { createSlice } from '@reduxjs/toolkit';
const branchSlice = createSlice({
    name: 'branch',
    initialState: {
        branch: {
            listData: null,
            isFetching: false,
            error: false,
            detailData: null,
        },
    },
    reducers: {
        getBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        getBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = false;
            state.branch.listData = action.payload;
        },
        getBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },

        createBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        createBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = false;
            state.branch.listData = action.payload;
        },
        createBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },
    },
});

export const {
    getBranchStart,
    getBranchSuccess,
    getBranchFailed,
    createBranchStart,
    createBranchSuccess,
    createBranchFailed,
} = branchSlice.actions;

export default branchSlice.reducer;
