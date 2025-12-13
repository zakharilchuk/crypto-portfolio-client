import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import type { Transaction } from "../types/transaction";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Portfolio } from "../types/portfolio";
import {
  deletePortfolio,
  fetchingPortfolioById,
  updatePortfolio,
} from "../services/portfolioService";
import { fetchingTransactionsByPortfolioId } from "../services/transactionService";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import Modal from "react-modal";
import SubmitButtonForm from "../components/SubmitButtonForm";

function PortfolioItem() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const isValidId = !isNaN(Number(id));
  const portfolioId = Number(id);
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    isError: isPortfolioError,
    error: portfolioError,
  } = useQuery<Portfolio>({
    queryKey: ["portfolio", portfolioId],
    queryFn: () => fetchingPortfolioById(portfolioId),
    enabled: !!portfolioId,
    retry: false,
  });
  const { data: transactions, isLoading: isTransactionsLoading } = useQuery<
    Transaction[]
  >({
    queryKey: ["transactions", portfolioId],
    queryFn: () => fetchingTransactionsByPortfolioId(portfolioId),
    enabled: !!portfolioId,
    retry: false,
  });


  const deleteMutation = useMutation({
    mutationFn: deletePortfolio,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      navigate("/portfolios");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updatePortfolio(id, name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["portfolio", portfolioId] });
      await queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      setIsUpdateModalOpen(false);
    },
  });

  const [newPortfolioName, setNewPortfolioName] = useState(
    portfolio?.name || ""
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
    setNewPortfolioName(portfolio?.name || "");
  };

   const handleDeletePortfolio = () => {
    deleteMutation.mutate(portfolioId);
    setIsDeleteModalOpen(false);
  };

  const handleUpdatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: portfolioId, name: newPortfolioName });
  };

  const isTransactionsArray = Array.isArray(transactions);

  return (
    <MainLayout>
      <div className="p-12 ml-64">
        {!isValidId ? (
          <p>Invalid portfolio ID. Please check the URL.</p>
        ) : isPortfolioLoading || isTransactionsLoading ? (
          <p>Loading...</p>
        ) : isPortfolioError ? (
          <p>Error loading portfolio: {portfolioError.message}</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl mb-2">{portfolio?.name}</h2>
              <div className="flex gap-4 items-center">
                <button>Add new transaction</button>
                <Ellipsis color="#000000" onClick={toggleMenu} />
                {isMenuOpen && (
                  <Modal
                    isOpen={isMenuOpen}
                    onRequestClose={toggleMenu}
                    contentLabel="Portfolio Menu"
                    className="absolute top-22 right-12 bg-white border border-gray-300 p-2 outline-none"
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
              </div>
            </div>
            <p className="mb-4">Type: {portfolio?.type}</p>
            <h3 className="text-lg mb-2">Transactions:</h3>
            <ul>
              {isTransactionsArray && transactions.length > 0 ? (
                transactions?.map((transaction: Transaction) => (
                  <li key={transaction.id} className="mb-2">
                    {transaction.coin.symbol} - Amount: {transaction.amount} -
                    Price: ${transaction.price} - Date:{" "}
                    {new Date(transaction.date).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <li>No transactions found.</li>
              )}
            </ul>
          </>
        )}
      </div>

      {isUpdateModalOpen && (
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          className="absolute top-1/2 left-1/2 bg-white border border-gray-300 p-4 outline-none transform -translate-x-1/2 -translate-y-1/2"
        >
          <form onSubmit={handleUpdatePortfolio} className="flex flex-col gap-3">
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
          <p>Are you sure you want to delete the portfolio "{portfolio?.name}"?</p>
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
