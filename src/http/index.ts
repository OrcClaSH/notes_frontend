import axios from 'axios';

import { IAuthResponse } from '@/store/slices/user/types';

export const API_URL = import.meta.env.VITE_API_URL
    // || 'http://clt.its:8000/api/v1';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

// TODO We are waiting for the implementation of token verification in API
// $api.interceptors.response.use((config) => config, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<IAuthResponse>(`${API_URL}/jwt/refresh`, { withCredentials: true });
//             localStorage.setItem('token', response.data.access);
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('[interceptors] Not authorized')
//         }
//     }
//     throw error;
// });

export default $api;
