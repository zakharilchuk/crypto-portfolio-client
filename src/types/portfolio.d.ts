import type { PnL } from "./dashboard";

export interface Portfolio {
  id: number; 
  name: string; 
  type: string; 
  total: number;
  pnl: PnL; 
}