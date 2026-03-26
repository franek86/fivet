import { useQueries, useQuery } from "@tanstack/react-query";
import { getAdminDashboardEarnings, getAdminDashboardStatistic, getUserDashboardStatistic } from "../services/apiDashboard.js";

export const useAdminDashboardData = (activePeriod) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["statistic"],
        queryFn: getAdminDashboardStatistic,
        staleTime: 30 * 60 * 1000,
      },
      {
        queryKey: ["earnings", activePeriod],
        queryFn: () => getAdminDashboardEarnings(activePeriod),
        staleTime: 30 * 60 * 1000,
      },
      {
        queryKey: ["geoUrl"],
        queryFn: async () => {
          const response = await fetch("https://unpkg.com/world-atlas@2/countries-110m.json");
          return response.json();
        },
        staleTime: 30 * 60 * 1000,
      },
    ],
  });

  const isLoading = results.some((r) => r.isLoading);
  const data = {
    statistic: results[0].data,
    earnings: results[1].data,
    geoUrl: results[2].data,
  };

  return { data, isLoading };
};

export const useUserDashboardData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-statistic"],
    queryFn: getUserDashboardStatistic,
    staleTime: 30 * 60 * 1000,
  });
  return { data, isLoading };
};
