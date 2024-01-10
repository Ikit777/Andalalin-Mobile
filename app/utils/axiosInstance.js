import axios from "axios";

const axiosInstance = axios.create();

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export default axiosInstance;
