import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// blog
import {
    getBookingStart,
    getBookingSuccess,
    getBookingFailed,
    createBookingStart,
    createBookingSuccess,
    createBookingFailed,
    detailBookingStart,
    detailBookingSuccess,
    detailBookingFailed,
    editBookingStart,
    editBookingSuccess,
    editBookingFailed,
} from './bookingSlice';
export const getBooking = async (booking, dispatch, accessToken) => {
    dispatch(getBookingStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/booking/search', booking, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getBookingSuccess(res.data));
        // loadApi();
        // navigate('/system/manage-user');
        // toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(getBookingFailed());
        toast.error('Có gì đó không ổn ?');
    }
};

export const createBooking = async (account, dispatch, accessToken, loadApi, navigate) => {
    dispatch(createBookingStart());
    try {
        await axios.post('http://localhost:8078/api/v1/blog/create', account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createBookingSuccess());
        loadApi();
        navigate('/system/manage-blog');
        toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(createBookingFailed());
        toast.error('Có thứ gì đó không ổn ?');
    }
};

export const getDetailBooking = async (id, dispatch, accessToken, getBooking) => {
    dispatch(detailBookingStart());
    try {
        const res = await axios.get(`http://localhost:8078/api/v1/blog/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(detailBookingSuccess(res.data));

        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailBookingFailed());
        toast.error('Có thứ gì đó không ổn ?');
    }
};

export const editBooking = async (id, account, dispatch, accessToken, handleUpdateApi) => {
    dispatch(editBookingStart());

    try {
        await axios.post(`http://localhost:8078/api/v1/blog/update/${id}`, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(editBookingSuccess());
        toast.success('Edit success');
        handleUpdateApi();
    } catch (err) {
        dispatch(editBookingFailed());
        toast.error('Có thứ gì đó không đúng');
    }
};
