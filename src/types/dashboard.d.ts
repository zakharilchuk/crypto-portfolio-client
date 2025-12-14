export interface PnL {
  value: number;
  percent: number;
}

export interface TransactionPortfolio {
  id: number;
  name: string;
  type: string;
}

export interface DashboardAsset {
  coinId: number;
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  invested: number;
  pnl: PnL;
}

export interface DashboardTransaction {
  id: number;
  coin: {
    coinId: number;
    symbol: string;
    name: string;
  };
  portfolio: TransactionPortfolio;
  amount: number;
  buyPrice: number;
  date: string;
}

export interface DistributionByToken {
  coinId: number;
  symbol: string;
  name: string;
  total: number;
  percentage: number;
}

export interface DistributionByPortfolio {
  portfolioId: number;
  name: string;
  total: number;
  percentage: number;
}

export interface Performer {
  coinId: number;
  name: string;
  symbol: string;
  pnlPercent: number;
  pnlValue: number;
}

export interface DashboardData {
  total: number;
  invested: number;
  pnl: PnL;
  assets: DashboardAsset[];
  transactions: DashboardTransaction[];
  distributionByToken: DistributionByToken[];
  distributionByPortfolio: DistributionByPortfolio[];
  bestPerformer: Performer;
  worstPerformer: Performer;
}
