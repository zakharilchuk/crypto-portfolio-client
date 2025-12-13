import { useQuery } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import { fetchPortfolios } from "../services/portfolioService";
import type { Portfolio } from "../types/portfolio";
import { Link } from "react-router-dom";

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
          <div className="p-12 ml-64">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl mb-4">Portfolios</h1>
              <button className='hover:cursor-pointer'>Add new portfolio</button>
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
