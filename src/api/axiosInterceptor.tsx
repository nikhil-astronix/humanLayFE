import axios, { AxiosRequestHeaders } from "axios";

// Create an Axios instance with retry logic
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api-human-layered.com",  // Production API URL
  headers: {
    "Content-Type": "application/json",
  },
  // Increase timeout for slower connections
  timeout: 30000, // 30 seconds
  // Add withCredentials for CORS
  withCredentials: false // Set to false for cross-origin requests without credentials
});

// Retry logic configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const retryRequest = async (error: any, retryCount = 0) => {
  const request = error.config;
  
  // Don't retry on 401, 403, or 404
  if (error.response?.status && [401, 403, 404].includes(error.response.status)) {
    return Promise.reject(error);
  }
  
  if (retryCount < MAX_RETRIES && (
    error.code === 'ERR_NETWORK' || 
    error.code === 'ECONNABORTED' || 
    error.response?.status >= 500
  )) {
    retryCount++;
    console.log(`Retry attempt ${retryCount} of ${MAX_RETRIES}`);
    // Wait for RETRY_DELAY * retryCount milliseconds
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retryCount));
    // Create a new request with increased timeout
    request.timeout = 30000 * (retryCount + 1);
    return apiClient(request);
  }
  return Promise.reject(error);
};

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Network or server error
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED' || !error.response) {
      console.error('Network Error:', error);
      // Attempt retry
      return retryRequest(error);
    }

    // Handle specific status codes
    switch (error.response?.status) {
      case 401:
        console.error("Unauthorized! Redirecting to login...");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        window.location.href = "/auth/login";
        break;
      case 403:
        console.error("Forbidden access!");
        break;
      case 404:
        console.error("Resource not found!");
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        console.error("Server error!");
        // Attempt retry for server errors
        return retryRequest(error);
      default:
        console.error("API Error:", error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
