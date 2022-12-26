import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth
import {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
} from './authSlice';

// Account
import {
    accountStart,
    accountSuccess,
    accountFailed,
    deleteAccountStart,
    deleteAccountsSuccess,
    deleteAccountFailed,
    createAccountStart,
    createAccountSuccess,
    createAccountFailed,
    detailAccountStart,
    detailAccountSuccess,
    detailAccountFailed,
} from './accountSlice';

export const loginUser = async (user, dispatch, navigate) => {
    // dispatch login start
    dispatch(loginStart());

    try {
        // dispatch login success
        const res = await axios.post('http://localhost:8078/api/v1/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/system/manage-user');
        toast.success('Đăng nhập thành công');
    } catch (err) {
        // dispatch login failed
        dispatch(loginFailed());
        toast.error('Chưa nhập đúng thông tin');
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:8078/api/v1/register', user);
        dispatch(registerSuccess());
        navigate('/login');
        toast.success('Đăng ký thành công');
    } catch (err) {
        dispatch(registerFailed());
        toast.error('Có thứ gì đó không đúng');
    }
};

export const logOut = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        dispatch(logOutSuccess());
        navigate('/login');
        toast.success('Logout success');
    } catch (err) {
        dispatch(logOutFailed());
    }
};

export const getAllAccount = async (account, dispatch, token) => {
    dispatch(accountStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/account/search', account, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('check ', res);
        dispatch(accountSuccess(res.data));
    } catch (err) {
        dispatch(accountFailed());
        toast.error('Có thứ gì đó không đúng');
    }
};

export const deleteAccount = async (id, accessToken, dispatch) => {
    dispatch(deleteAccountStart());
    try {
        const res = await axios.get(`http://localhost:8078/api/v1/account/delete/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(deleteAccountsSuccess());
    } catch (err) {
        dispatch(deleteAccountFailed(err.response.data));
    }
};

export const createAccount = async (account, dispatch, accessToken, handleCancel) => {
    dispatch(createAccountStart());
    try {
        await axios.post('http://localhost:8078/api/v1/registerCustomer', account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createAccountSuccess());
        toast.success('Tạo tài khoản thành công');
        handleCancel();
    } catch (err) {
        dispatch(createAccountFailed());
        toast.error('Có thứ gì đó không đúng');
    }
};

export const getDetailAccount = async (id, dispatch, accessToken) => {
    dispatch(detailAccountStart());
    try {
        const res = await axios.get(`http://localhost:8078/api/v1/account/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(detailAccountSuccess(res.data));
        toast.success('Detail success');
    } catch (err) {
        dispatch(detailAccountFailed());
        toast.error('Có thứ gì đó không đúng');
    }
};
