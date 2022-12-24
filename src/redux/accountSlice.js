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
    },
});

export const {
    accountStart,
    accountSuccess,
    accountFailed,
    deleteAccountStart,
    deleteAccountsSuccess,
    deleteAccountFailed,
} = accountSlice.actions;

export default accountSlice.reducer;
