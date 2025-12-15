import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  fetchPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "../services/portfolioService";
import { createTransaction } from "../services/transactionService";
import type { PortfolioAnalytics } from "../types/portfolio";

type UpdatePortfolioPayload = { name: string };
type CreateTransactionPayload = {
  coinId: number;
  amount: number;
  price: number;
  date: string;
};

export function usePortfolioItem(portfolioId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const portfolioQuery = useQuery<PortfolioAnalytics>({
    queryKey: ["portfolio", portfolioId],
    queryFn: () => fetchPortfolioById(portfolioId),
    enabled: !!portfolioId,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdatePortfolioPayload) =>
      updatePortfolio(portfolioId, payload.name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["portfolio", portfolioId],
      });
      await queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePortfolio(portfolioId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      navigate("/portfolios");
    },
  });

  const createTransactionMutation = useMutation({
    mutationFn: (payload: CreateTransactionPayload) =>
      createTransaction({ ...payload, portfolioId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["portfolio", portfolioId],
      });
    },
  });

  return {
    portfolioQuery,
    updatePortfolio: updateMutation,
    deletePortfolio: deleteMutation,
    createTransaction: createTransactionMutation,
  };
}
