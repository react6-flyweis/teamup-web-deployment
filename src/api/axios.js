import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE || '').replace(/\/$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // E.g., add auth token if available in local storage
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global responses or errors (like token expiration) here
    return Promise.reject(error);
  }
);

export default api;
