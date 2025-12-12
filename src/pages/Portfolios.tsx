import { useQuery } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import { fetchPortfolios } from "../services/portfolioService";
import type { Portfolio } from "../types/portfolio";

function Portfolios() {
  const { data: portfolios, isLoading } = useQuery<Portfolio[]>({
    queryKey: ["portfolios"],
    queryFn: fetchPortfolios,
  });

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MainLayout>
          <div className="p-4 ml-64">
            <h1 className="text-2xl mb-4">Portfolios</h1>
            <ul>
              {portfolios?.map((portfolio: Portfolio) => (
                <li key={portfolio.id} className="mb-2">
                  <strong>{portfolio.name}</strong> - Type: {portfolio.type}
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
