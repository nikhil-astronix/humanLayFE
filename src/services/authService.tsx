import apiClient from "@/api/axiosInterceptor";
import { AuthResponse } from "@/types/auth";
import type { AxiosError } from "axios";

function isAxiosError(error: unknown): error is AxiosError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'isAxiosError' in error &&
    'config' in error &&
    'response' in error
  );
}

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
  } catch (err: unknown) {
    console.error("Send OTP error:", err);
    if (isAxiosError(err)) {
      if (err.code === 'ERR_NETWORK') {
        throw new Error("Network error. Please check your internet connection and try again.");
      }
      if (err.code === 'ECONNABORTED') {
        throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
      }
      throw new Error(err.response?.data?.message || "Failed to send OTP. Please try again.");
    }
    throw err;
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
  } catch (err: unknown) {
    console.error("Verify OTP error:", err);
    if (isAxiosError(err)) {
      if (err.code === 'ERR_NETWORK') {
        throw new Error("Network error. Please check your internet connection and try again.");
      }
      if (err.code === 'ECONNABORTED') {
        throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
      }
      throw new Error(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
    throw err;
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
  } catch (err: unknown) {
    console.error("Login error:", err);
    if (isAxiosError(err)) {
      if (err.code === 'ERR_NETWORK') {
        throw new Error("Network error. Please check your internet connection and try again.");
      }
      if (err.code === 'ECONNABORTED') {
        throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
      }
      switch (err.response?.status) {
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
          throw new Error(err.response?.data?.message || "An unexpected error occurred. Please try again.");
      }
    }
    throw err;
  }
};
