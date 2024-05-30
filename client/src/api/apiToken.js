import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.apiKey
    },
    validateStatus: function (status) {
        return status < 500;
    }
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            delete config.headers['Authorization'];
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
