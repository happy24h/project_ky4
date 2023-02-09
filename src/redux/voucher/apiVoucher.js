
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    deleteVoucherFailed,
    deleteVoucherStart, deleteVoucherSuccess,
    detailVoucherFailed,
    detailVoucherStart,
    detailVoucherSuccess,
    voucherFailed,
    voucherStart, voucherSuccess,
} from '~/redux/voucher/VoucherSilce';


export const createVoucher = async (voucher,dispatch,accessToken,navigate) => {
    dispatch(voucherStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/voucher/create',voucher,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("tạo voucher thành công");
        navigate('/system/manage-voucher');
    } catch (err) {
        dispatch(voucherFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}

export const getDetailVoucher = async (id,dispatch,accessToken) => {
    dispatch(detailVoucherStart());
    try {
        const res = await axios.get('http://localhost:8078/api/v1/voucher/'+id,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(detailVoucherSuccess(res.data));
    } catch (err) {
        dispatch(detailVoucherFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}

export const getAllVoucher = async (data,dispatch,accessToken) => {
    dispatch(voucherStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/voucher/search',data,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(voucherSuccess(res.data));
    } catch (err) {
        dispatch(voucherFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}

export const deleteVoucherByVoucherCode = async (voucherCode,dispatch,accessToken) => {
    dispatch(deleteVoucherStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/voucher/'+voucherCode,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(deleteVoucherSuccess());
    } catch (err) {
        dispatch(deleteVoucherFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}