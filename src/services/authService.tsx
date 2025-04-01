import apiClient from "@/api/axiosInterceptor";
import { AuthResponse } from "@/types/auth";

export const sendOTP = async (
  email: string,
  password: string,
  role: string
): Promise<void> => {
  await apiClient.post<AuthResponse>("/users/send-otp", {
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
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/users/verify-otp", {
    email,
    otp,
    password,
    role,
  });
  return response.data;
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
  } catch (error: unknown) {
    console.log("Login error:", error);
    throw new Error("An unexpected error occurred");
  }
};
