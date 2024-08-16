import axios from 'axios';
import useAuth from '../hooks/useAuth';


const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      console.log(response)
      if (response?.status === 401) {
        try {
        const { refreshAccessToken } = useAuth();
          await refreshAccessToken(); 
          const newToken = localStorage.getItem('accessToken');
          config.headers['Authorization'] = `Bearer ${newToken}`;
          return api(config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

export default api;
