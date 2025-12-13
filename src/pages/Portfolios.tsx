import { useQuery } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import { fetchPortfolios } from "../services/portfolioService";
import type { Portfolio } from "../types/portfolio";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import { createPortfolio } from "../services/portfolioService";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Portfolios() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({ name: "", type: "manual" });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  const { data: portfolios, isLoading } = useQuery<Portfolio[]>({
    queryKey: ["portfolios"],
    queryFn: fetchPortfolios,
  });

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    createPortfolio(newPortfolio)
      .then((createdPortfolio) => {
        console.log("Portfolio created:", createdPortfolio);
      })
      .catch((error) => {
        console.error("Error creating portfolio:", error);
      });
    
    closeModal();
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MainLayout>
          <div className="p-12 ml-64">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl mb-4">Portfolios</h1>
              <button className='hover:cursor-pointer' onClick={openModal}>Add new portfolio</button>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
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
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Portfolio Type:</label>
                    <select
                      name="portfolioType"
                      id="portfolioType"
                      className="border p-2 w-full"
                      value={newPortfolio.type}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, type: e.target.value })}
                    >
                      <option value="manual">manual</option>
                      <option value="exchange">exchange</option>
                      <option value="wallet">wallet</option>
                    </select>
                  </div>
                  <button type="submit" className="mr-2" onClick={handleAddPortfolio}>Add Portfolio</button>
                  <button type="button" onClick={closeModal}>Cancel</button>
                </form>
              </Modal>
            </div>
            <ul>
              {portfolios?.map((portfolio: Portfolio) => (
                <li key={portfolio.id} className="mb-2">
                  <Link to={`/portfolios/${portfolio.id}`}>
                    {portfolio.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </MainLayout>
      )}
    </>
  );
}

export default Portfolios;
