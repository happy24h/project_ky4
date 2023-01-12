
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    deleteTypeServiceFailed,
    deleteTypeServiceStart, deleteTypeServiceSuccess, detailTypeServiceFailed,
    detailTypeServiceStart, detailTypeServiceSuccess,
    typeServiceFailed,
    typeServiceStart,
    typeServiceSuccess,
} from '~/redux/type_service/typeServiceSilce';

export const createTypeService = async (typeService,dispatch,accessToken,navigate) => {
    dispatch(typeServiceStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/type_service/create',typeService,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("tạo loại dịch vụ thành công");
        navigate('/system/manage-type-service');
    } catch (err) {
        dispatch(typeServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}

export const getDetailTypeService = async (id,dispatch) => {
    dispatch(detailTypeServiceStart());
    try {
        const res = await axios.get('http://localhost:8078/api/v1/type_service/'+id);
        dispatch(detailTypeServiceSuccess(res.data));
    } catch (err) {
        dispatch(detailTypeServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}

export const updateTypeService = async (id,typeService,dispatch,accessToken,navigate) => {
    dispatch(typeServiceStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/type_service/update/'+id,typeService,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("sửa loại dịch vụ thành công");
        navigate('/system/manage-type-service/detail/'+id);
    } catch (err) {
        dispatch(typeServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}

export const deleteForTypeService = async (id,dispatch,accessToken) => {
    dispatch(deleteTypeServiceStart());
    try {
        await axios.get('http://localhost:8078/api/v1/type_service/delete/' + id,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(deleteTypeServiceSuccess());
        toast.success("xóa loại dịch vụ thành công");
    } catch (err) {
        dispatch(deleteTypeServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}

export const searchTypeService = async (typeService,dispatch) => {
    dispatch(typeServiceStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/type_service/search',typeService);
        dispatch(typeServiceSuccess(res.data));
    } catch (err) {
        dispatch(typeServiceFailed(err.response.data));
        toast.error(err.response.data);
    }
}