import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistic } from "../services/apiDashboard.js";

export const useDashboardStatistic = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["statistic"],
    queryFn: getDashboardStatistic,
    staleTime: 1000,
    refetchOnWindowFocus: true,
  });

  return { data, isFetching, isError };
};
