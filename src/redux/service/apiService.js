
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    serviceFailed,
    serviceStart,
    serviceSuccess, typeServiceFailed,
    typeServiceStart,
    typeServiceSuccess,
} from '~/redux/service/serviceSilce';

export const getAllService = async (serviceSearch, dispatch) => {
    dispatch(serviceStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/service/search', serviceSearch);
        dispatch(serviceSuccess(res.data));
    } catch (err) {
        dispatch(serviceFailed());
        toast.error('Có thứ gì đó không đúng');
    }
}

export const getAllTypeService = async (dispatch) => {
    dispatch(typeServiceStart());
    try {
        const res = await axios.get('http://localhost:8078/api/v1/findAllTypeService');
        dispatch(typeServiceSuccess(res.data));
    } catch (err) {
        dispatch(typeServiceFailed());
        toast.error('Có thứ gì đó không đúng');
    }
}