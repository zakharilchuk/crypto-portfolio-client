import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { fetchUserData } from "../services/userService";
import MainLayout from "../layouts/MainLayout";
import { useDashboard } from "../hooks/useDashboard";
import PerformanceStatsCard from "../components/PerformanceStatsCard";
import DistributionChart from "../components/DistributionChart";
import BaseDataGrid from "../components/dataGrid/BaseGrid";
import { assetColumns } from "../components/dataGrid/columns/assetColumns";
import { transactionColumnsWithPortfolio } from "../components/dataGrid/columns/transactionsColumns";

function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboard();
  const [chartType, setChartType] = useState<"portfolios" | "assets">(
    "portfolios"
  );
  const [tableType, setTableType] = useState<"assets" | "transactions">(
    "assets"
  );
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      fetchUserData()
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          navigate("/login");
        });
    }
  }, [accessToken, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <MainLayout>
      <div className="ml-64 py-10 px-25 flex flex-col gap-4">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <div className="flex w-full gap-10">
          <PerformanceStatsCard
            total={data.total}
            pnl={data.pnl}
            bestPerformer={data.bestPerformer}
            worstPerformer={data.worstPerformer}
          />
          <div className="flex flex-col border-gray-300 border p-5 w-full">
            <div className="flex justify-between">
              <p className="text-xl">Distribution</p>
              <div>
                <button
                  onClick={() => setChartType("portfolios")}
                  className={`mr-2 ${
                    chartType === "assets" ? "text-gray-300" : ""
                  }`}
                >
                  Portfolios
                </button>
                <button
                  onClick={() => setChartType("assets")}
                  className={`mr-2 ${
                    chartType === "portfolios" ? "text-gray-300" : ""
                  }`}
                >
                  Assets
                </button>
              </div>
            </div>
            {chartType === "portfolios" ? (
              <DistributionChart
                data={data.distributionByPortfolio.map((item) => ({
                  id: item.portfolioId,
                  value: item.total,
                  label: `${item.name} (${item.percentage}%)`,
                }))}
              />
            ) : (
              <DistributionChart
                data={data.distributionByToken.map((item) => ({
                  id: item.coinId,
                  value: item.total,
                  label: `${item.name} (${item.percentage}%)`,
                }))}
              />
            )}
          </div>
        </div>
        <div>
          <div className=" mb-4">
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
              columns={transactionColumnsWithPortfolio}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
