import { useQuery } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import { fetchPortfolios } from "../services/portfolioService";
import type { Portfolio } from "../types/portfolio";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortfolio } from "../services/portfolioService";
import BaseDataGrid from "../components/dataGrid/BaseGrid";
import { portfolioColumns } from "../components/dataGrid/columns/portfoliosColumns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreatePortfolioModal from "../components/modals/CreatePortfolioModal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Portfolios() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: portfolios, isLoading } = useQuery<Portfolio[]>({
    queryKey: ["portfolios"],
    queryFn: fetchPortfolios,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: createPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  const handleRowClick = (row: unknown) => {
    navigate(`/portfolios/${(row as Portfolio).id}`);
  };

  if (isLoading) {
    // put it in the center of the page
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  return (
    <MainLayout>
      <div className="ml-64 py-10 px-25 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl mb-4">Portfolios</h1>
          <button
            className="hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Add new portfolio
          </button>
        </div>
        {portfolios?.length === 0 ? (
          <div>No portfolios found.</div>
        ) : (
          <BaseDataGrid
            rows={portfolios as Portfolio[]}
            columns={portfolioColumns}
            handleRowClick={handleRowClick}
          />
        )}
      </div>

      <CreatePortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePortfolio={(portfolio) => {
          mutation.mutate(portfolio);
        }}
      />
    </MainLayout>
  );
}

export default Portfolios;
