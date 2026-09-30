import axios from "axios";

import {
    HTTP_ERROR_MESSAGES,
    DEFAULT_ERROR_MESSAGE,
    NETWORK_ERROR_MESSAGE,
    EMAIL_EXISTS_MESSAGE
} from '../constants/errorCodes'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers: {'Content-Type': 'application/json'},
});

axiosInstance.interceptors.response.use((response) => {
    if(response.data && response.data.success === false) {
        
        return Promise.reject({
            code: response.data.error?.code || 'BUSINESS_ERROR',
            message: response.data.error?.message || DEFAULT_ERROR_MESSAGE,
            status: response.status,
        });
    }

    return response.data;
},

(error) => {

    if(!error.response) {
        return Promise.reject({
            status: null,
            code: 'NETWORK_ERROR',
            message: NETWORK_ERROR_MESSAGE,
        });
    }

    const { status, data } = error.response;
    const backendError = data?.error;

    const errorString = `${backendError?.code || ''} ${backendError?.message || ''}`.toLowerCase();
    const isEmailDuplicate = status === 409 || (status === 400 && errorString.includes('email'));

    let message;
    if(isEmailDuplicate) {
        message = EMAIL_EXISTS_MESSAGE;
    } else if(status >= 500) {
        message = HTTP_ERROR_MESSAGES[500];
    } else {
        message = backendError?.message || HTTP_ERROR_MESSAGES[status] || DEFAULT_ERROR_MESSAGE;
    }

    return Promise.reject({
        status,
        code: isEmailDuplicate ? 'EMAIL_EXISTS' : backendError?.code || `HTTP_${status}`,
        message,
    });
}

);

export default axiosInstance;


