import { authInstance } from "./axios";
import type { Coin } from "../types/coin";

export async function getAllCoins() {
  try {
    const response = await authInstance.get<Coin[]>("/coins");
    return response.data;
  } catch (error) {
    console.log("Error fetching coins:", error);
    throw error;
  }
}
