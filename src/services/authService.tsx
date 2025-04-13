import apiClient from "@/api/axiosInterceptor";
import { AuthResponse } from "@/types/auth";

export const sendOTP = async (
  email: string,
  password: string,
  role: string
): Promise<void> => {
  try {
    await apiClient.post<AuthResponse>("/users/send-otp", {
      email,
      password,
      role,
    });
  } catch (error: any) {
    console.error("Send OTP error:", error);
    if (error.code === 'ERR_NETWORK') {
      throw new Error("Network error. Please check your internet connection and try again.");
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
    }
    throw new Error(error.response?.data?.message || "Failed to send OTP. Please try again.");
  }
};

export const verifyOTP = async (
  email: string,
  otp: string,
  password: string,
  role: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>("/users/verify-otp", {
      email,
      otp,
      password,
      role,
    });
    return response.data;
  } catch (error: any) {
    console.error("Verify OTP error:", error);
    if (error.code === 'ERR_NETWORK') {
      throw new Error("Network error. Please check your internet connection and try again.");
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
    }
    throw new Error(error.response?.data?.message || "Invalid OTP. Please try again.");
  }
};

export const loginIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>("/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      throw new Error("Network error. Please check your internet connection and try again.");
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
    }
    
    // Handle specific HTTP errors
    switch (error.response?.status) {
      case 401:
        throw new Error("Invalid email or password.");
      case 403:
        throw new Error("Your account has been locked. Please contact support.");
      case 404:
        throw new Error("Account not found. Please check your email.");
      case 429:
        throw new Error("Too many login attempts. Please try again later.");
      case 500:
      case 502:
      case 503:
      case 504:
        throw new Error("Server error. Please try again later.");
      default:
        throw new Error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  }
};
