import type { Coin } from "./coin";

export interface Transaction {
  id: number;
  amount: number;
  price: number;
  coin: Coin;
  date: string;
}
