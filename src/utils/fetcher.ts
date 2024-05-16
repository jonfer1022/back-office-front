import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const baseURL: string = 'http://localhost:8080';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
