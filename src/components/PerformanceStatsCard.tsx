import type { Performer, PnL } from "../types/dashboard";
import TopPerformerCard from "./TopPerformerCard";

interface PerformanceStatsCardProps {
  total: number;
  pnl: PnL;
  bestPerformer: Performer;
  worstPerformer: Performer;
}

function PerformanceStatsCard({
  total,
  pnl,
  bestPerformer,
  worstPerformer,
}: PerformanceStatsCardProps) {
  return (
    <div className="border-gray-300 border p-5 w-3/7 flex flex-col gap-4">
      <div className="flex justify-between flex-wrap">
        <div>
          <p className="text-xl">Total Worth:</p>
          <p className="text-2xl">${total}</p>
        </div>
        <div>
          <p className="text-xl">Total PnL:</p>
          <p className="text-2xl">
            <span
              style={{
                color: pnl.value >= 0 ? "green" : "red",
              }}
            >
              ${pnl.value?.toFixed(2) ?? "0.00"}{" "}
            </span>
            <span
              style={{
                color: pnl.percent >= 0 ? "green" : "red",
              }}
            >
              {pnl.percent !== undefined && pnl.percent >= 0 ? (
                <>
                  <span>↑</span>
                  {pnl.percent.toFixed(2)}%
                </>
              ) : (
                <>
                  <span>↓</span>
                  {pnl.percent?.toFixed(2)}%
                </>
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <TopPerformerCard
          title="Best Performer"
          performer={bestPerformer}
        />
        <TopPerformerCard
          title="Worst Performer"
          performer={worstPerformer}
        />
      </div>
    </div>
  );
}

export default PerformanceStatsCard;
