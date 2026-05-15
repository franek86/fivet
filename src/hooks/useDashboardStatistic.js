import { useQueries, useQuery } from "@tanstack/react-query";
import { getAdminDashboardEarnings, getAdminDashboardStatistic, getGeoWorld, getUserDashboardStatistic } from "../services/apiDashboard.js";

export const useAdminDashboardData = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["statistic"],
        queryFn: getAdminDashboardStatistic,
        staleTime: 30 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["earnings"],
        queryFn: getAdminDashboardEarnings,
        staleTime: 30 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    ],
  });

  const [statistic, earnings] = results;

  return {
    data: {
      statistic: statistic.data,
      earnings: earnings.data,
    },
    isStatisticLoading: statistic.isLoading,
    isEarningsLoading: earnings.isLoading,
  };
};

export const useGeoWorldData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["geoUrl"],
    queryFn: getGeoWorld,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });
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
