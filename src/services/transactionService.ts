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
  type: "buy" | "sell";
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

export async function deleteTransaction(portfolioId: number, transactionId: number) {
  try {
    const response = await authInstance.delete<{ message: string }>(
      `portfolios/${portfolioId}/transactions/${transactionId}`
    );
    return response.data;
  } catch (error) {
    console.log(`Error deleting transaction with id ${transactionId}:`, error);
    throw error;
  }
}
