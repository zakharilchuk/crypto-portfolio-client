import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

interface BaseDataGridProps<T> {
  rows: T[];
  columns: GridColDef[];
  loading?: boolean;
  sortField?: string;
  handleRowClick?: (row: unknown) => void;
}

function BaseDataGrid<T extends object>({
  rows,
  columns,
  loading = false,
  sortField,
  handleRowClick,
}: BaseDataGridProps<T>) {
  return (
    <>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          boxShadow: "none",
          borderRadius: 0,
        }}
      >
        <DataGrid
          rows={rows.map((row, index) => ({ id: index, ...row }))}
          loading={loading}
          columns={columns.map((col) => ({
            ...col,
            disableColumnMenu: true,
          }))}
          sx={{
            border: 1,
            borderColor: "#cbd5e1",
            fontFamily: "Teachers, sans-serif",
            fontSize: "16px",
            borderRadius: 0,
            boxShadow: "none",
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-row.Mui-selected:hover": {
              backgroundColor: "transparent",
            },
          }}
          hideFooterPagination={true}
          disableRowSelectionOnClick={true}
          hideFooter={true}
          disableColumnResize={true}
          disableMultipleRowSelection={true}
          disableColumnSelector={true}
          onRowClick={handleRowClick}
          initialState={
            sortField
              ? {
                  sorting: {
                    sortModel: [{ field: sortField as string, sort: "desc" }],
                  },
                }
              : undefined
          }
        />
      </Paper>
    </>
  );
}

export default BaseDataGrid;
