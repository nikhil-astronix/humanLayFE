import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  baseURL: "http://43.204.236.28:8000/", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // console.error("Unauthorized! Redirecting to login...");
      // localStorage.removeItem("token");
      // window.location.href = "/login"; // Redirect user to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
