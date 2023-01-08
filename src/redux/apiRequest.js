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
    editAccountSuccess,
    editAccountFailed,
    editAccountStart,
} from './accountSlice';

import { roleFailed, roleStart, roleSuccess } from '~/redux/roleSlice';

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

export const getAllRoles = async (dispatch, accessToken) => {
    dispatch(roleStart());
    try {
        const res = await axios.get('http://localhost:8078/api/v1/account/role', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(roleSuccess(res.data));
        // navigate('/login');
        // toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(roleFailed());
        toast.error('Có thứ gì đó không đúng khi lấy roles');
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
        dispatch(deleteAccountFailed());
    }
};

export const createAccount = async (account, dispatch, accessToken, loadApi, navigate) => {
    dispatch(createAccountStart());
    try {
        await axios.post('http://localhost:8078/api/v1/register', account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createAccountSuccess());
        loadApi();
        navigate('/system/manage-user');
        toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(createAccountFailed());
        toast.error('Có thứ gì đó không ổn');
    }
};

export const createAccountCustomer = async (account, dispatch, accessToken) => {
    dispatch(createAccountStart());
    try {
        await axios.post('http://localhost:8078/api/v1/registerCustomer', account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createAccountSuccess());
        toast.success('Tạo tài khoản thành công');
        // handleCancel();
    } catch (err) {
        dispatch(createAccountFailed());
        toast.error('có thứ gì đó không ổn');
    }
};

export const getDetailAccount = async (id, dispatch, accessToken) => {
    dispatch(detailAccountStart());
    try {
        const res = await axios.get(`http://localhost:8078/api/v1/account/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(detailAccountSuccess(res.data));
        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailAccountFailed());
        toast.error('có thứ gì đó không đúng');
    }
};

export const editDetailAccount = async (id, account, dispatch, accessToken, handleUpdateApi) => {
    dispatch(editAccountStart());
    try {
        const res = await axios.post(`http://localhost:8078/api/v1/account/update/${id}`, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(editAccountSuccess());
        toast.success('Edit success');
        handleUpdateApi();
    } catch (err) {
        dispatch(editAccountFailed());
        toast.error('Có thứ gì đó không đúng');
    }
};
