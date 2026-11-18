import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../services/apiPayments.js";

export const useGetPayments = (params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["payments", params],
    queryFn: () => getPayments(params),
    keepPreviousData: true,
  });

  return { data: data?.payload, count: data?.meta?.total, isLoading, isError, isFetching };
};
