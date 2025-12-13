import { authInstance } from "./axios";
import type { Portfolio } from "../types/portfolio";
import axios from "axios";

export async function fetchPortfolios() {
  try {
    const response = await authInstance.get<Portfolio[]>("/portfolio");
    return response.data;
  } catch (error) {
    console.log("Error fetching portfolios:", error);
    throw error;
  }
}

export async function fetchingPortfolioById(id: number) {
  try {
    const response = await authInstance.get<Portfolio>(`/portfolio/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
}