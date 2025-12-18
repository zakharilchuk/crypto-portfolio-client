import { authInstance } from "./axios";
import type { Transaction } from "../types/transaction";

export async function fetchingTransactionsByPortfolioId(portfolioId: number) {
  try {
    const response = await authInstance.get<Transaction[]>(`/portfolios/${portfolioId}/transactions`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`Error fetching transactions for portfolio id ${portfolioId}:`, error);
    throw error;
  }
}

export async function createTransaction(transactionData: {
  portfolioId: number;
  coinId: number;
  amount: number;
  price: number;
  date: string;
}) {
  try {
    const response = await authInstance.post<Transaction>(`/portfolios/${transactionData.portfolioId}/transactions`, transactionData);
    return response.data;
  } catch (error) {
    console.log("Error creating transaction:", error);
    throw error;
  }
}