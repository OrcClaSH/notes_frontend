import axios, { AxiosRequestConfig } from 'axios';

import { IAuthResponse } from '@/store/slices/user/types';

export const API_URL = import.meta.env.VITE_API_URL || 'http://clt.its:8000/api/v1';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config;
});

// $api.interceptors.response.use((config) => config, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<IAuthResponse>(`${API_URL}/jwt/refresh`, { withCredentials: true });
//             localStorage.setItem('token', response.data.access);
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('[interceptors] Не авторизован')
//         }
//     }
//     throw error;
// });

export default $api;
