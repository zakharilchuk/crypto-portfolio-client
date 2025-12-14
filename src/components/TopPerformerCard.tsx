import type { Performer } from "../types/dashboard";
import { TokenIcon } from "@web3icons/react/dynamic";

interface TopPerformerCardProps {
  performer: Performer;
  title: string;
}
function TopPerformerCard({ performer, title }: TopPerformerCardProps) {
  return (
    <div>
      <p className="text-xl mb-2">{title}</p>
      <div className="text-xl">
        <div className="flex gap-2 items-center mb-2">
          <TokenIcon
            symbol={performer.symbol}
            size={36}
            variant="background"
          />
          <span>{performer.symbol}</span>
        </div>
        <span
          style={{
            color: performer.pnlValue >= 0 ? "green" : "red",
          }}
        >
          ${performer.pnlValue?.toFixed(2) ?? "0.00"} (
          {performer.pnlPercent?.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
}

export default TopPerformerCard;
