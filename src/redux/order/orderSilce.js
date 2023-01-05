import { createSlice } from '@reduxjs/toolkit';
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {
            orderCurrent: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // Order
        orderStart: (state) => {
            state.service.isFetching = true;
        },
        orderSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.error = false;
            state.service.orderCurrent = action.payload;
        },
        orderFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },
    },
});

export const { orderStart, orderSuccess, orderFailed,
} = orderSlice.actions;

export default orderSlice.reducer;