import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../services/apiPayments.js";

export const useGetPayments = () => {
  const queryParams = {};

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["payments", queryParams],
    queryFn: () => getPayments(queryParams),
    keepPreviousData: true,
  });

  return { data: data?.payload, count: data?.meta?.total, isLoading, isError, isFetching };
};
