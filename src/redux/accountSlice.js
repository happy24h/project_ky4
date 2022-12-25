import { createSlice } from '@reduxjs/toolkit';
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: {
            accountCurrent: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        accountStart: (state) => {
            state.account.isFetching = true;
        },
        accountSuccess: (state, action) => {
            state.account.isFetching = false;
            state.account.error = false;
            state.account.accountCurrent = action.payload;
        },
        accountFailed: (state) => {
            state.account.isFetching = false;
            state.account.error = true;
        },
        deleteAccountStart: (state) => {
            state.account.isFetching = true;
        },
        deleteAccountsSuccess: (state) => {
            state.account.isFetching = false;
        },
        deleteAccountFailed: (state) => {
            state.account.isFetching = false;
            state.account.error = true;
        },
        createAccountStart: (state) => {
            state.account.isFetching = true;
        },
        createAccountSuccess: (state) => {
            state.account.isFetching = false;
            state.account.error = false;
            // state.account.success = true;
        },
        createAccountFailed: (state) => {
            state.account.isFetching = false;
            state.account.error = true;
            // state.account.success = false;
        },
    },
});

export const {
    accountStart,
    accountSuccess,
    accountFailed,
    deleteAccountStart,
    deleteAccountsSuccess,
    deleteAccountFailed,
    createAccountStart,
    createAccountSuccess,
    createAccountFailed,
} = accountSlice.actions;

export default accountSlice.reducer;
