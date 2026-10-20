import { useQuery } from "@tanstack/react-query";
import {
  getAdminDashboardEarnings,
  getAdminDashboardStatistic,
  getUserDashboardStatistic,
  getUsersByCountry,
} from "../services/apiDashboard.js";

export const useAdminDashboardData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["statistic"],
    queryFn: getAdminDashboardStatistic,
  });
  return { data, isLoading };
};

export const useUserByCountryData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["country-data"],
    queryFn: getUsersByCountry,
  });
  return { data, isLoading };
};

export const useAdminEarningsData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["statistic"],
    queryFn: getAdminDashboardEarnings,
  });
  return { data, isLoading };
};

export const useUserDashboardData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-statistic"],
    queryFn: getUserDashboardStatistic,
  });
  return { data, isLoading };
};
