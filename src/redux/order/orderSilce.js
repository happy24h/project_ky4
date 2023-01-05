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
            state.order.isFetching = true;
        },
        orderSuccess: (state, action) => {
            state.order.isFetching = false;
            state.order.error = false;
            state.order.orderCurrent = action.payload;
        },
        orderFailed: (state) => {
            state.order.isFetching = false;
            state.order.error = true;
        },
    },
});

export const { orderStart, orderSuccess, orderFailed,
} = orderSlice.actions;

export default orderSlice.reducer;