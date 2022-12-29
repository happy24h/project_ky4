import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// blog
import {
    getBlogStart,
    getBlogSuccess,
    getBlogFailed,
    createBlogStart,
    createBlogSuccess,
    createBlogFailed,
    detailBlogStart,
    detailBlogSuccess,
    detailBlogFailed,
} from './blogSlice';
export const getBlog = async (account, dispatch, accessToken) => {
    dispatch(getBlogStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/blog/search', account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getBlogSuccess(res.data));
        // loadApi();
        // navigate('/system/manage-user');
        // toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(getBlogFailed());
        toast.error('Có gì đó không ổn ?');
    }
};

export const createBlog = async (account, dispatch, accessToken, loadApi, navigate) => {
    dispatch(createBlogStart());
    try {
        await axios.post('http://localhost:8078/api/v1/blog/create', account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createBlogSuccess());
        loadApi();
        navigate('/system/manage-blog');
        toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(createBlogFailed());
        toast.error('Có thứ gì đó không ổn ?');
    }
};

export const getDetailAccount = async (id, dispatch, accessToken) => {
    dispatch(detailBlogStart());
    try {
        const res = await axios.get(`http://localhost:8078/api/v1/blog/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(detailBlogSuccess(res.data));
        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailBlogFailed());
        toast.error('Có thứ gì đó không ổn ?');
    }
};
