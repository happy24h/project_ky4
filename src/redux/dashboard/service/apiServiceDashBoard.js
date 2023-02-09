
import axios from 'axios';
import { toast } from 'react-toastify';

export const getDashBoardBar = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/service/dashboard-bar', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};


export const getDashBoardCountServicesAndStaff = async (dataValues, accessToken) => {
    try {
        const res = await axios.post('http://localhost:8078/api/v1/service/dashboard-count', dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};