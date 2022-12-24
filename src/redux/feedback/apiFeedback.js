import { feedbackFailed, feedbackStart, feedbackSuccess } from '~/redux/feedback/feedbackSlice';
import axios from 'axios';

import { toast } from 'react-toastify';


export const getAllFeedback = async (feedback, dispatch, token) => {
    dispatch(feedbackStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/feedback', feedback, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(feedbackSuccess(res.data));
    } catch (err) {
        dispatch(feedbackFailed());
        toast.error('Có thứ gì đó không đúng');
    }
}