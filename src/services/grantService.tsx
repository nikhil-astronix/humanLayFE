// services/grantService.ts

import apiClient from "@/api/axiosInterceptor";
import { GrantData } from "@/types/grantsData";

// Replace with actual endpoint

export const submitGrant = async (data: GrantData) => {
  try {
    const response = await apiClient.post<GrantData>("/grants", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Grant service error:", error);
    return { success: false, error };
  }
};
