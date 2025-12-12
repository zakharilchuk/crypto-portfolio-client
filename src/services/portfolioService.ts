import { authInstance } from "./axios";
import type { Portfolio } from "../types/portfolio";

export async function fetchPortfolios() {
  try {
    const response = await authInstance.get<Portfolio[]>("/portfolio");
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw error;
  }
}