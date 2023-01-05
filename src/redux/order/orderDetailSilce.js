import { createSlice } from '@reduxjs/toolkit';
const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        orderDetail: {
            orderDetailCurrent: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // Order
        orderDetailStart: (state) => {
            state.service.isFetching = true;
        },
        orderDetailSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.error = false;
            state.service.orderDetailCurrent = action.payload;
        },
        orderDetailFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },
    },
});

export const { orderDetailStart, orderDetailSuccess, orderDetailFailed,
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;