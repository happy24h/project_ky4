import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    getBranchStart,
    getBranchSuccess,
    getBranchFailed,
    createBranchStart,
    createBranchSuccess,
    createBranchFailed,
    deleteBranchStart,
    deleteBranchSuccess,
    deleteBranchFailed,
    detailBranchStart,
    detailBranchSuccess,
    detailBranchFailed,
    editBranchStart,
    editBranchSuccess,
    editBranchFailed,
} from './branchSlice';

export const getBranch = async (dataValues, dispatch, accessToken) => {
    dispatch(getBranchStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/branch/search', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getBranchSuccess(res.data));
    } catch (err) {
        dispatch(getBranchFailed());
        toast.error('Có gì đó không ổn ?');
    }
};

export const createBranch = async (dataValues, dispatch, accessToken, loadApi, navigate) => {
    dispatch(createBranchStart());
    try {
        await axios.post('http://localhost:8078/api/v1/branch/create', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createBranchSuccess());
        loadApi();
        navigate('/system/manage-branch');
        toast.success('create branch success');
    } catch (err) {
        dispatch(createBranchFailed());
        toast.error('Có thứ gì đó không ổn ?');
    }
};

export const deleteBranch = async (id, accessToken, dispatch, handleLoading) => {
    dispatch(deleteBranchStart());
    try {
        await axios.get(`http://localhost:8078/api/v1/branch/delete/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(deleteBranchSuccess());
        handleLoading();
    } catch (err) {
        dispatch(deleteBranchFailed());
        toast.error('Có thứ gì đó không ổn ?');
    }
};

export const getDetailBranch = async (id, dispatch, accessToken) => {
    dispatch(detailBranchStart());
    try {
        const res = await axios.get(`http://localhost:8078/api/v1/branch/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(detailBranchSuccess(res.data));

        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailBranchFailed());
        // toast.error('branch undefined ?');
    }
};

export const editBranch = async (id, account, dispatch, accessToken, handleUpdateApi) => {
    dispatch(editBranchStart());

    try {
        await axios.post(`http://localhost:8078/api/v1/branch/update/${id}`, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(editBranchSuccess());
        toast.success('Edit success');
        handleUpdateApi();
    } catch (err) {
        dispatch(editBranchFailed());
        toast.error('Có thứ gì đó không đúng');
    }
};
