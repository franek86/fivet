import { useQuery } from "@tanstack/react-query";
import { getDashboardEarnings, getDashboardStatistic } from "../services/apiDashboard.js";

export const useDashboardStatistic = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["statistic"],
    queryFn: getDashboardStatistic,
  });
  return { data, isLoading };
};

export const useDashboardEarnings = (period) => {
  const { data, isLoading } = useQuery({
    queryKey: ["earnings", period],
    queryFn: () => getDashboardEarnings(period),
    keepPreviousData: true,
  });

  return { data, isLoading };
};
