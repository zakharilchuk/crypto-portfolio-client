import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import type { Transaction } from "../types/transaction";
import { useQuery } from "@tanstack/react-query";
import type { Portfolio } from "../types/portfolio";
import { fetchingPortfolioById } from "../services/portfolioService";
import { fetchingTransactionsByPortfolioId } from "../services/transactionService";

function PortfolioItem() {
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
              <button>Add new transaction</button>
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
    </MainLayout>
  );
}

export default PortfolioItem;
