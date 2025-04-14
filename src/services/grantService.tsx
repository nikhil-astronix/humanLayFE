// services/grantService.ts

import apiClient from "@/api/axiosInterceptor";
import { GrantData, TrendingGrantData } from "@/types/grantsData";

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

export const getTrendingGrants = async () => {
  try {
    const response = await apiClient.get<TrendingGrantData>("/grants/recommeded");
    console.log("responseeeeee",response)
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Grant service error:", error);
    return { success: false, error };
  }
};

export const getUpcomingGrants = async () => {
  try {
    const response = await apiClient.get<TrendingGrantData>("/grants/recommeded");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Grant service error:", error);
    return { success: false, error };
  }
};

export const getGrantsEndingSoon = async () => {
  try {
    const response = await apiClient.get<TrendingGrantData>("/grants/recommeded");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Grant service error:", error);
    return { success: false, error };
  }
};

export const saveGrant = async (id: string) => {
  try {
    const response = await apiClient.post<GrantData>("/users/save-grant/"+id);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Grant service error:", error);
    return { success: false, error };
  }
};