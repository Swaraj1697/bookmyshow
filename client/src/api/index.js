import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the token to the request headers
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
