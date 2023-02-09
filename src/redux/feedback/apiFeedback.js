import {
    deleteFeedbackFailed,
    deleteFeedbackStart, deleteFeedbackSuccess,
    detailFeedbackFailed,
    detailFeedbackStart,
    detailFeedbackSuccess,
    feedbackFailed,
    feedbackStart,
    feedbackSuccess,
} from '~/redux/feedback/feedbackSlice';
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
        toast.error(err.response.data.message);
    }
}

export const createFeedback = async (data, dispatch) => {
    dispatch(feedbackStart());
    try {
        await axios.post('http://localhost:8078/api/v1/feedback/create', data);
        dispatch(feedbackSuccess());
        toast.success('Gửi phản hồi thành công');
    } catch (err) {
        dispatch(feedbackFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}

export const getDetailFeedback = async (id, dispatch, token) => {
    dispatch(detailFeedbackStart());
    try {
        let res = await axios.get('http://localhost:8078/api/v1/feedback/'+id,{
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(detailFeedbackSuccess(res.data));
    } catch (err) {
        dispatch(detailFeedbackFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}

export const changeStatusDetailFeedback = async (id,status, dispatch, token) => {
    dispatch(detailFeedbackStart());
    try {
        await axios.get('http://localhost:8078/api/v1/feedback/changeStatus/'+id+"?status="+status,{
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(feedbackSuccess());
        toast.success('Thay đổi trạng thái phản hồi thành công');
    } catch (err) {
        dispatch(detailFeedbackFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}

export const deleteFeedback = async (id, dispatch, token) => {
    dispatch(deleteFeedbackStart());
    try {
        await axios.get('http://localhost:8078/api/v1/feedback/deleteRead/'+id,{
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(deleteFeedbackSuccess());
        toast.success('Thư rác thành công');
    } catch (err) {
        dispatch(deleteFeedbackFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}