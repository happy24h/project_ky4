
import axios from 'axios';
import { toast } from 'react-toastify';

export const getDashBoardLine = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/order/dashboard-line', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
export const getDashBoardPei = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/order/dashboard-pei', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
export const getDashBoardColumn = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/order/dashboard-column', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};

export const getDashBoardStatus = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/order/dashboard-status', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};