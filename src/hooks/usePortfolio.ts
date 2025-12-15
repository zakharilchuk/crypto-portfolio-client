import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  fetchPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "../services/portfolioService";

import type { PortfolioAnalytics } from "../types/portfolio";

type UpdatePortfolioPayload = {
  name: string;
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
      await queryClient.invalidateQueries({
        queryKey: ["portfolios"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePortfolio(portfolioId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["portfolios"],
      });
      navigate("/portfolios");
    },
  });

  return {
    portfolioQuery,
    updatePortfolio: updateMutation,
    deletePortfolio: deleteMutation,
  };
}
