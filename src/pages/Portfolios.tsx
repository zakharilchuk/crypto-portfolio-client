import { useQuery } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import { fetchPortfolios } from "../services/portfolioService";
import type { Portfolio } from "../types/portfolio";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import { createPortfolio } from "../services/portfolioService";
import BaseDataGrid from "../components/dataGrid/BaseGrid";
import { portfolioColumns } from "../components/dataGrid/columns/portfoliosColumns";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Portfolios() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    name: "",
    type: "manual",
  });
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

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(newPortfolio);
    setIsModalOpen(false);
  };

  const handleRowClick = (row: unknown) => {
    navigate(`/portfolios/${(row as Portfolio).id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="ml-64 py-10 px-25 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Add Portfolio Modal"
      >
        <h2 className="text-xl mb-4">Add New Portfolio</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Portfolio Name:</label>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Enter portfolio name"
              value={newPortfolio.name}
              onChange={(e) =>
                setNewPortfolio({ ...newPortfolio, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Portfolio Type:</label>
            <select
              name="portfolioType"
              id="portfolioType"
              className="border p-2 w-full"
              value={newPortfolio.type}
              onChange={(e) =>
                setNewPortfolio({ ...newPortfolio, type: e.target.value })
              }
            >
              <option value="manual">manual</option>
              <option value="exchange">exchange</option>
              <option value="wallet">wallet</option>
            </select>
          </div>
          <button type="submit" className="mr-2" onClick={handleAddPortfolio}>
            Add Portfolio
          </button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </form>
      </Modal>
    </MainLayout>
  );
}

export default Portfolios;
