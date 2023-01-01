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
