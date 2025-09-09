import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistic } from "../services/apiShips.js";

export const useDashboardStatistic = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["statistic"],
    queryFn: getDashboardStatistic,
  });

  return { data, isFetching, isError };
};
