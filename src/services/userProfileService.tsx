// services/userProfileService.ts

import apiClient from "@/api/axiosInterceptor";
import { UserData } from "@/types/userData";
// Replace with actual endpoint

export const getUserData = async () => {
  try {
    const response = await apiClient.get<UserData>("/users/profile");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("user profile service error:", error);
    return { success: false, error };
  }
};
