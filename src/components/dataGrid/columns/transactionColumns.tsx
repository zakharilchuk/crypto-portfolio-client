import type { GridColDef, GridCellParams } from "@mui/x-data-grid";
import { TokenIcon } from "@web3icons/react/dynamic";
import dayjs from "dayjs";

export const transactionColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params: GridCellParams) => {
      const tx = params.row.coin;
      return (
        <div className="flex items-center gap-2">
          <TokenIcon symbol={tx.symbol} size={36} variant="background" />
          <span>{tx.name}</span>
        </div>
      );
    },
    align: "left",
    headerAlign: "left",
  },
  {
    field: "symbol",
    headerName: "Symbol",
    flex: 1,
    align: "left",
    headerAlign: "left",
    renderCell: (params: GridCellParams) => {
      return params.row.coin.symbol;
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    type: "number",
    renderCell: (params: GridCellParams) => {
      const value = params.value as number;
      return value.toFixed(4);
    },
    align: "left",
    headerAlign: "left",
  },
  {
    field: "buyPrice",
    headerName: "Buy Price",
    flex: 1,
    type: "number",
    renderCell: (params: GridCellParams) => {
      const value = params.value as number;
      return `$${value.toFixed(2)}`;
    },
    align: "left",
    headerAlign: "left",
  },
  {
    field: "portfolio",
    headerName: "Portfolio",
    flex: 1,
    align: "left",
    headerAlign: "left",
    renderCell: (params: GridCellParams) => {
      return params.row.portfolio.name;
    },
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    align: "left",
    headerAlign: "left",
    renderCell: (params: GridCellParams) => {
      return dayjs(params.row.date).format("MMM DD, YYYY");
    },
  },
];
