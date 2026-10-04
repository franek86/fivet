import { useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { useDebounce } from "../useDebounce.js";

export const useShips = (filters) => {
  const debouncedSearch = useDebounce(filters.search, 500);
  const params = {
    ...filters,
    search: debouncedSearch,
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["ships", params],
    queryFn: () => getShips(params),
    placeholderData: (previousData) => previousData,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  return { ships: data?.data, count: data?.meta?.total, isLoading, isFetching, error };
};
