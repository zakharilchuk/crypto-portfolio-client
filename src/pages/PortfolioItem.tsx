import { Link, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import Modal from "react-modal";
import SubmitButtonForm from "../components/SubmitButtonForm";
import { usePortfolioItem } from "../hooks/usePortfolio";
import PerformanceStatsCard from "../components/PerformanceStatsCard";
import DistributionChart from "../components/DistributionChart";
import { assetColumns } from "../components/dataGrid/columns/assetColumns";
import { transactionColumnsWithActions } from "../components/dataGrid/columns/transactionsColumns";
import BaseDataGrid from "../components/dataGrid/BaseGrid";
import { useQuery } from "@tanstack/react-query";
import { getAllCoins } from "../services/coinService";
import type { Coin } from "../types/coin";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CreateTransactionModal from "../components/modals/CreateTransactionModal";
import { AxiosError } from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function PortfolioItem() {
  const { id } = useParams<{ id: string }>();
  if (!id || isNaN(Number(id))) {
    throw new Error("Portfolio ID is required and have to be a number");
  }

  const {
    portfolioQuery,
    updatePortfolio,
    deletePortfolio,
    createTransaction,
    deleteTransaction,
    syncPortfolio,
  } = usePortfolioItem(Number(id));

  const { data, isLoading, isError } = portfolioQuery;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const { data: coinsData } = useQuery<Coin[]>({
    queryKey: ["coins"],
    queryFn: getAllCoins,
  });

  const [newPortfolioName, setNewPortfolioName] = useState(
    data?.portfolio.name || ""
  );
  const [tableType, setTableType] = useState<"assets" | "transactions">(
    "assets"
  );

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setIsUpdateModalOpen(true);
    setNewPortfolioName(data?.portfolio.name || "");
  };

  const handleDeletePortfolio = () => {
    deletePortfolio.mutate();
    setIsDeleteModalOpen(false);
  };

  const handleUpdatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdateModalOpen(false);
    updatePortfolio.mutate({ name: newPortfolioName });
  };

  const handleSyncPortfolio = () => {
    syncPortfolio.mutate();
  };

  if (!id || isNaN(Number(id))) {
    return (
      <MainLayout>
        <div className="p-12 ml-64">
          <p>Invalid portfolio ID. Please check the URL.</p>
          <Link
            to="/portfolios"
            className="hover:text-gray-400 hover:cursor-pointer"
          >
            Go back to portfolios
          </Link>
        </div>
      </MainLayout>
    );
  }

  if (isLoading) {
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

  if (isError || !data) {
    return (
      <MainLayout>
        <div className="p-12 ml-64">
          <p>Error loading portfolio. Please try again later.</p>
          <Link
            to="/portfolios"
            className="hover:text-gray-400 hover:cursor-pointer"
          >
            Go back to portfolios
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="ml-64 py-10 px-25 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-2xl mb-2">{data?.portfolio.name}</h2>
            <div className="flex gap-4 items-center">
              {data.portfolio.type === "manual" ? (
                <button
                  className="hover:text-gray-400 hover:cursor-pointer"
                  onClick={() => setIsAddTransactionModalOpen(true)}
                >
                  Add new transaction
                </button>
              ) : (
                <button
                  className="hover:text-gray-400 hover:cursor-pointer"
                  onClick={handleSyncPortfolio}
                >
                  Sync
                </button>
              )}
              <Ellipsis color="#000000" onClick={toggleMenu} />
            </div>
          </div>
        </div>
        {data.invested === 0 ? (
          <div>
            <p>Your portfolio is empty. Add new transactions.</p>
          </div>
        ) : (
          <>
            <div className="flex w-full gap-10">
              <PerformanceStatsCard
                total={data.total}
                pnl={data.pnl}
                bestPerformer={data.bestPerformer}
                worstPerformer={data.worstPerformer}
              />
              <div className="flex flex-col border-gray-300 border p-5 w-full">
                <h3 className="text-lg mb-2">Distribution by tokens</h3>
                <DistributionChart
                  data={data.distributionByToken.map((item) => ({
                    id: item.coinId,
                    value: item.total,
                    label: `${item.name} (${item.percentage}%)`,
                  }))}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <div className="text-xl">
                  <button
                    onClick={() => setTableType("assets")}
                    className={`mr-2 ${
                      tableType === "transactions" ? "text-gray-300" : ""
                    }`}
                  >
                    Assets
                  </button>
                  <button
                    onClick={() => setTableType("transactions")}
                    className={`mr-2 ${
                      tableType === "assets" ? "text-gray-300" : ""
                    }`}
                  >
                    Transactions
                  </button>
                </div>
              </div>
              {tableType === "assets" ? (
                <BaseDataGrid
                  rows={data.assets}
                  columns={assetColumns}
                  sortField="totalValue"
                />
              ) : (
                <BaseDataGrid
                  rows={data.transactions}
                  columns={transactionColumnsWithActions(
                    deleteTransaction.mutate
                  )}
                />
              )}
            </div>
          </>
        )}
      </div>
      <CreateTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        coins={coinsData || []}
        onCreateTransaction={(payload, onSuccess, onError) => {
          createTransaction.mutate(payload, {
            onSuccess: () => {
              setSnackbarMessage("Transaction created successfully");
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
              onSuccess?.();
            },
            onError: (error: Error) => {
              let message = "Something went wrong";

              if (error instanceof AxiosError) {
                message =
                  (error.response?.data as { message: string })?.message ||
                  message;
              }

              setSnackbarMessage(message);
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
              onError?.(message);
            },
          });
        }}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {isMenuOpen && (
        <Modal
          isOpen={isMenuOpen}
          onRequestClose={toggleMenu}
          contentLabel="Portfolio Menu"
          className="absolute top-22 right-25 bg-white border border-gray-300 p-2 outline-none"
        >
          <ul>
            <li
              className="block w-full text-left px-4 py-2 border-black hover:bg-gray-100"
              onClick={handleUpdate}
            >
              update portfolio
            </li>
            <li
              className="block w-full text-left px-4 py-2 border-black hover:bg-gray-100"
              onClick={handleDelete}
            >
              delete portfolio
            </li>
          </ul>
        </Modal>
      )}

      {isUpdateModalOpen && (
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          className="absolute top-1/2 left-1/2 bg-white border border-gray-300 p-4 outline-none transform -translate-x-1/2 -translate-y-1/2"
        >
          <form
            onSubmit={handleUpdatePortfolio}
            className="flex flex-col gap-3"
          >
            <h2 className="text-lg">update portfolio</h2>
            <input
              type="text"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
              className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
            />
            <SubmitButtonForm text="Update Portfolio" />
            <button
              className="hover:cursor-pointer"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Close
            </button>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          className="absolute top-1/2 left-1/2 bg-white border border-gray-300 p-4 outline-none transform -translate-x-1/2 -translate-y-1/2"
        >
          <h2 className="text-lg mb-4">Confirm Delete</h2>
          <p>
            Are you sure you want to delete the portfolio "
            {data?.portfolio.name}"?
          </p>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-red-700 text-white px-4 py-2 hover:opacity-85"
              onClick={() => {
                handleDeletePortfolio();
                setIsDeleteModalOpen(false);
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 hover:cursor-pointer hover:text-gray-600"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
}

export default PortfolioItem;
