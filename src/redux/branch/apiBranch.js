import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBranchStart, getBranchSuccess, getBranchFailed } from './branchSlice';

export const getBranch = async (account, dispatch, accessToken) => {
    dispatch(getBranchStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/branch/search', account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getBranchSuccess(res.data));
    } catch (err) {
        dispatch(getBranchFailed());
        toast.error('Có gì đó không ổn ?');
    }
};
