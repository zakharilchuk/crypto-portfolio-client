import type { DashboardAsset, DashboardTransaction, DistributionByToken, Performer, PnL } from "./dashboard";

export interface Portfolio {
  id: number; 
  name: string; 
  type: string; 
  total: number;
  pnl: PnL; 
}

export interface PortfolioAnalytics {
  portfolio: {
    id: number;
    name: string;
    type: string;
  };
  invested: number;
  total: number;
  pnl: PnL;
  assets: DashboardAsset[];
  transactions: DashboardTransaction[];
  distributionByToken: DistributionByToken[];
  bestPerformer: Performer;
  worstPerformer: Performer;
}