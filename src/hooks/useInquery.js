import { useQuery } from "@tanstack/react-query";
import { fetchMyInquery } from "../services/apiInquery.js";
import { useDebounce } from "./useDebounce.js";

export const useGetMyInqueries = (params) => {
  const debouncedSearch = useDebounce(params.search, 500);

  const queryParams = {
    ...params,
    search: debouncedSearch,
    status: params.status,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["inqueries", queryParams],
    queryFn: () => fetchMyInquery(queryParams),
    placeholderData: (previousData) => previousData,
  });

  return { data, isLoading, isError };
};
