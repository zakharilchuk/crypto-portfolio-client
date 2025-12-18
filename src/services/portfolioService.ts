import { authInstance } from "./axios";
import type { Portfolio, PortfolioAnalytics } from "../types/portfolio";
import axios from "axios";

export async function fetchPortfolios() {
  try {
    const response = await authInstance.get<Portfolio[]>(
      "/analytics/portfolios"
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching portfolios:", error);
    throw error;
  }
}

export async function createPortfolio(portfolioData: {
  name: string;
  type: string;
  exchangeName?: string;
  apiKey?: string;
  apiSecret?: string;
}) {
  try {
    const response = await authInstance.post<Portfolio>(
      "/portfolios",
      portfolioData
    );
    return response.data;
  } catch (error) {
    console.log("Error creating portfolio:", error);
    throw error;
  }
}

export async function updatePortfolio(id: number, name: string) {
  try {
    const response = await authInstance.put<Portfolio>(`/portfolios/${id}`, {
      name,
    });
    return response.data;
  } catch (error) {
    console.log(`Error updating portfolio with id ${id}:`, error);
    throw error;
  }
}

export async function deletePortfolio(id: number) {
  try {
    const response = await authInstance.delete<{ message: string }>(
      `/portfolios/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(`Error deleting portfolio with id ${id}:`, error);
    throw error;
  }
}

export async function fetchPortfolioById(id: number) {
  try {
    const response = await authInstance.get<PortfolioAnalytics>(
      `analytics/portfolios/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
}

export async function syncPortfolioById(id: number) {
  try {
    const response = await authInstance.post(`/portfolios/${id}/sync`);
    return response.data;
  } catch (error) {
    console.log(`Error syncing portfolio with id ${id}:`, error);
    throw error;
  }
}
