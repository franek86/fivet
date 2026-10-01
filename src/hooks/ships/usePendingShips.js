import { useQuery } from "@tanstack/react-query";
import { getPendingShips } from "../../services/apiShips.js";

export const usePendingShips = (filters) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pending-ship", filters],
    queryFn: () => getPendingShips(filters),
    staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError };
};
