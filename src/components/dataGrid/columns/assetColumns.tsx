import type { GridColDef, GridCellParams } from "@mui/x-data-grid";
import { TokenIcon } from "@web3icons/react/dynamic";
import type { PnL } from "../../../types/dashboard";

export const assetColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      const asset = params.row;
      return (
        <div className="flex items-center gap-2">
          <TokenIcon symbol={asset.symbol} size={36} variant="background" />
          <span>{asset.name || "-"}</span>
        </div>
      );
    },
  },
  {
    field: "symbol",
    headerName: "Symbol",
    flex: 1,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      return `${params.value || "-"}`;
    },
  },
  {
    field: "currentPrice",
    headerName: "Price",
    flex: 1,
    type: "number",
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      const value = params.value as number | undefined;
      return value != null ? `$${value.toFixed(2)}` : "-";
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    type: "number",
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      const value = params.value as number | undefined;
      return value != null ? value.toFixed(4) : "-";
    },
  },
  {
    field: "avgPrice",
    headerName: "Average Price",
    flex: 1,
    type: "number",
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      const value = params.value as number | undefined;
      return value != null ? `$${value.toFixed(2)}` : "-";
    },
  },
  {
    field: "totalValue",
    headerName: "Total Value",
    flex: 1,
    type: "number",
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      const value = params.value as number | undefined;
      return value != null ? `$${value.toFixed(2)}` : "-";
    },
  },
  {
    field: "pnl",
    headerName: "PnL",
    flex: 1,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      const value = params.value as number;
      return (
        <div style={{ color: value >= 0 ? "green" : "red" }}>
          {value.toFixed(2)}%
        </div>
      );
    },
    valueGetter: (params: PnL) => {
      return params.percent;
    },
  },
];
