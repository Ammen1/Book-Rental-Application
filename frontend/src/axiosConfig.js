import axios from 'axios';
import { API_URL } from './config'; 

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const instance = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to set the Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Get the token dynamically for each request
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
