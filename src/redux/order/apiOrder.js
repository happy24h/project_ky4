import axios from 'axios';
import { toast } from 'react-toastify';
import {
    orderFailed,
    orderStart,
    orderSuccess,
    createOderStart,
    createOderSuccess,
    createOderFailed,
    createOderDetailStart,
    createOderDetailSuccess,
    createOderDetailFailed,
} from '~/redux/order/orderSilce';
import { orderDetailFailed, orderDetailStart, orderDetailSuccess } from '~/redux/order/orderDetailSilce';

export const getAllOrder = async (orderSearch, dispatch, accessToken) => {
    dispatch(orderStart());
    console.log('kiem tra orderSearch' + orderSearch);
    try {
        const res = await axios.post('http://localhost:8078/api/v1/order/search', orderSearch, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(orderSuccess(res.data));
    } catch (err) {
        dispatch(orderFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
};

export const createOder = async (oder, dispatch, accessToken) => {
    dispatch(createOderStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/order/create', oder, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createOderSuccess(res.data));

        toast.success('create success');
    } catch (err) {
        dispatch(createOderFailed());
        toast.error(err.response.data.message);
    }
};
export const createOderDetail = async (oder, dispatch, accessToken) => {
    dispatch(createOderDetailStart());
    try {
        await axios.post('http://localhost:8078/api/v1/order/createOrderDetail', oder);
        dispatch(createOderDetailSuccess());

        toast.success('Quý khách đã đặt lịch thành công');
    } catch (err) {
        dispatch(createOderDetailFailed());
        toast.error(err.response.data.message);
    }
};

export const getDetailOrder = async (id, dispatch, accessToken) => {
    dispatch(orderDetailStart());
    try {
        const res = await axios.get('http://localhost:8078/api/v1/order/' + id, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(orderDetailSuccess(res.data));
    } catch (err) {
        dispatch(orderDetailFailed());
        toast.error(err.response.data.message);
    }
};

export const updateStatusOrder = async (id, status, dispatch, accessToken) => {
    try {
        const res = await axios.get('http://localhost:8078/api/v1/order/update/status/' + id + '?status=' + status, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success('Đổi trạng thái đơn hàng thành công');
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
