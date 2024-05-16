import axios from 'axios';
import config from './config'
import Cookies from 'js-cookie';

const token =  Cookies.get("token");
const allToken = "Bearer " + token;
const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.apiKey,
        Authorization: allToken
    },
    validateStatus: function (status) {
        return status < 500;
    }
    
});


export default api;