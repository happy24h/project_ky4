import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: 'account',
    initialState:{
        listAccounts:{
            currentAccounts: null,
            isFetching: false,
            error: false,
        }
    },
    reducers:{
        accountStart: (state) => {
            state.login.isFetching = true;
        },
        accountSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.error = false;
            state.login.currentAccounts = action.payload;
        },
        accountFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    }
})
export const {
    accountStart,
    accountSuccess,
    accountFailed,
} = accountSlice.actions;

export default accountSlice.reducer;