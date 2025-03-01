// axios instance configuration
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
  });
  
  // Response interceptor
  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        try {
          originalRequest._retry = true;
          await axios.get('http://localhost:8000/apiV1/majestycollections/login', { withCredentials: true });
          return api(originalRequest);
        } catch (refreshError) {
          window.location = '/login';
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );