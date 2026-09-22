import { useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";

export const useShips = (filters) => {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["ships", filters],
    queryFn: () => getShips(filters),
    placeholderData: (previousData) => previousData,
    /* staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000, */
  });

  return { ships: data?.data, count: data?.meta?.total, isLoading, isFetching, error };
};
