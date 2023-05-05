import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL

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

// TODO We are waiting for the implementation of token verification in API.
// refreshToken is not integrated into the cookie and httpOnly param
// $api.interceptors.response.use((config) => config, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<IAuthResponse>(`${API_URL}/jwt/refresh`, { withCredentials: true });
//             localStorage.setItem('token', response.data.access);
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('[interceptors] Not authorized', e)
//         }
//     }
//     throw error;
// });

export default $api;
