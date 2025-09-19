import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistic } from "../services/apiDashboard.js";

export const useDashboardStatistic = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["statistic"],
    queryFn: getDashboardStatistic,
    staleTime: 30 * 60 * 1000,
  });

  return { data, isFetching, isError };
};
