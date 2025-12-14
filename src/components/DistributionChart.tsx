import { PieChart } from "@mui/x-charts/PieChart";

interface PieChartDataItem {
  id: number;
  value: number;
  label: string;
}

interface DistributionChartProps {
  data: PieChartDataItem[];
  width?: number;
  height?: number;
}

function DistributionChart({ data, width, height }: DistributionChartProps) {
  return (
    <>
      <PieChart
        series={[{ data, valueFormatter: (item) => `$${item.value}` }]}
        width={width || 300}
        height={height || 300}
      />
    </>
  );
}

export default DistributionChart;
