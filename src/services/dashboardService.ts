import type { DashboardData } from "../types/dashboard";
import { authInstance } from "./axios";

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await authInstance.get("/analytics/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};