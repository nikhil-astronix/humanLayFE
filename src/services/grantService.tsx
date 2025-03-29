// services/grantService.ts

import apiClient from "@/api/axiosInterceptor";
import { GrantData } from "@/types/grantsData";
import axios from "axios";

// Replace with actual endpoint

export const grantService = {
  submitGrant: async (data: GrantData) => {
    try {
      const response = await apiClient.post<GrantData>("/grants", data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Grant service error:", error);
      return { success: false, error };
    }
  },
};
