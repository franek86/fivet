import { useQueries, useQuery } from "@tanstack/react-query";
import { getAdminDashboardEarnings, getAdminDashboardStatistic, getGeoWorld, getUserDashboardStatistic } from "../services/apiDashboard.js";

export const useAdminDashboardData = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["statistic"],
        queryFn: getAdminDashboardStatistic,
        staleTime: 30 * 60 * 1000,
      },
      {
        queryKey: ["earnings"],
        queryFn: getAdminDashboardEarnings,
        staleTime: 30 * 60 * 1000,
      },
      {
        queryKey: ["geoUrl"],
        queryFn: getGeoWorld,
        staleTime: 1000 * 60 * 60 * 24 * 7,
      },
    ],
  });

  const [statistic, earnings, geoUrl] = results;

  const isLoading = results.some((q) => q.isLoading || q.isFetching);

  return {
    data: {
      statistic: statistic.data,
      earnings: earnings.data,
      geoUrl: geoUrl.data,
    },
    isLoading,
  };
};

export const useUserDashboardData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-statistic"],
    queryFn: getUserDashboardStatistic,
    staleTime: 30 * 60 * 1000,
  });
  return { data, isLoading };
};
