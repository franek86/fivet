import { useQueries } from "@tanstack/react-query";
import { getDashboardEarnings, getDashboardStatistic } from "../services/apiDashboard.js";

export const useDashboardData = (activePeriod) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["statistic"],
        queryFn: getDashboardStatistic,
        staleTime: 30 * 60 * 1000,
      },
      {
        queryKey: ["earnings", activePeriod],
        queryFn: () => getDashboardEarnings(activePeriod),
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
