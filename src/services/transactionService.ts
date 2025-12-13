import { authInstance } from "./axios";
import type { Transaction } from "../types/transaction";

export async function fetchingTransactionsByPortfolioId(portfolioId: number) {
  try {
    const response = await authInstance.get<Transaction[]>(`/portfolio/${portfolioId}/transactions`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`Error fetching transactions for portfolio id ${portfolioId}:`, error);
    throw error;
  }
}