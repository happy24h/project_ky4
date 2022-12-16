import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.interceptors.response.use((response) => {
    // eslint-disable-next-line no-unused-vars
    const { data } = response;
    return response.data;
});

export default instance;
