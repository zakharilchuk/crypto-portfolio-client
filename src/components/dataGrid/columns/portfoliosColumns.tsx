import type { GridColDef, GridCellParams } from "@mui/x-data-grid"; 
import type { PnL } from "../../../types/dashboard";

export const portfolioColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "total",
    headerName: "Total Value",
    flex: 1,
    align: "left",
    headerAlign: "left",
    renderCell: (params) => {
      const value = params.row.total as number;
      return `${value.toFixed(2)}` || '-';
    },
  },
  {
    field: "pnl",
    headerName: "PnL",
    flex: 1,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridCellParams) => {
      const value = params.row.pnl as PnL;
      return (
        <div>
          {value.percent >= 0 ? (
            <span style={{ color: "green" }}>{value.percent.toFixed(2)}%</span>
          ) : (
            <span style={{ color: "red" }}>{value.percent.toFixed(2)}%</span>
          )}
        </div>
      );
    },
  },
];