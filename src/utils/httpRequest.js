import axios from 'axios';

const env = import.meta.env;

const httpRequest = axios.create({
  baseURL: env.VITE_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

// Flag to prevent multiple refresh requests at the same time
let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Add response interceptor to handle 401 errors
httpRequest.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await httpRequest.post('/identity/auth/refresh'); // Refresh the token
        console.log('response.data: ', response.data);
        isRefreshing = false;

        onTokenRefreshed();

        // call back the first request
        return axios(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        console.error('Refresh token failed:', refreshError);
        localStorage.setItem('isAuthenticated', 'false');
        window.location.replace('/login'); // Redirect without adding to history

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpRequest;
