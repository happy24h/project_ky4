
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    deleteServiceFailed,
    deleteServiceStart, deleteServiceSuccess, detailServiceFailed, detailServiceStart, detailServiceSuccess,
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
        const res = await axios.get('http://localhost:8078/api/v1/service/findAllTypeService');
        dispatch(typeServiceSuccess(res.data));
    } catch (err) {
        dispatch(typeServiceFailed());
        toast.error('Có thứ gì đó không đúng');
    }
}

export const createService = async (service,dispatch,accessToken,navigate) => {
    dispatch(serviceStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/service/create',service,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("tạo dịch vụ thành công");
        navigate('/system/manage-service');
    } catch (err) {
        dispatch(typeServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}

export const updateService = async (id,service,dispatch,accessToken,loadAPI) => {
    dispatch(serviceStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/service/update/'+id,service,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("sửa dịch vụ thành công");
        dispatch(serviceSuccess());
        loadAPI();
    } catch (err) {
        dispatch(typeServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}

export const getDetailService = async (id,dispatch) => {
    dispatch(detailServiceStart());
    try {
        const res = await axios.get('http://localhost:8078/api/v1/service/'+id,);
        dispatch(detailServiceSuccess(res.data));
    } catch (err) {
        dispatch(detailServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}

export const deleteService = async (id,dispatch,accessToken) => {
    dispatch(deleteServiceStart());
    try {
        await axios.get('http://localhost:8078/api/v1/service/delete/'+id,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(deleteServiceSuccess());
        toast.success("Xóa dịch vụ thành công");
    } catch (err) {
        dispatch(deleteServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}