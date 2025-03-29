import apiClient from "@/api/axiosInterceptor";
import { AuthResponse } from "@/types/auth";

export const sendOTP = async (
  email: string,
  password: string,
  role: string
) => {
  return await apiClient.post<AuthResponse>("/users/send-otp", {
    email,
    password,
    role,
  });
};

export const verifyOTP = async (
  email: string,
  otp: string,
  password: string,
  role: string
) => {
  return await apiClient.post<AuthResponse>("/users/verify-otp", {
    email,
    otp,
    password,
    role,
  });
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
    throw new Error(error.response?.data?.message || "Failed to sign in");
  }
};
