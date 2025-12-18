import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/dashboardService";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    retry: false,
    // long polling every 10 seconds
    refetchInterval: 10000, 
    refetchIntervalInBackground: true, 
  });
}
