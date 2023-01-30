
import axios from 'axios';
import { toast } from 'react-toastify';

export const getDashBoardHeat = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/booking/dashboard-heat', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error('Có gì đó không ổn ?');
    }
};
export const getDashBoardRange = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/booking/dashboard-range', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error('Có gì đó không ổn ?');
    }
};
export const getDashBoardPei = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/booking/dashboard-pei', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error('Có gì đó không ổn ?');
    }
};
export const getDashBoardColumn = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/booking/dashboard-column', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error('Có gì đó không ổn ?');
    }
};

