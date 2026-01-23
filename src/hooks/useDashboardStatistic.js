import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistic } from "../services/apiDashboard.js";

export const useDashboardStatistic = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["statistic"],
    queryFn: getDashboardStatistic,
  });

  return { data, isLoading };
};
