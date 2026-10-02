import { useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { useSelector } from "react-redux";

export const useShips = (filters) => {
  const searchVessels = useSelector((state) => state.search.vessels);
  const params = {
    ...filters,
    search: searchVessels,
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["ships", params],
    queryFn: () => getShips(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  return { ships: data?.data, count: data?.meta?.total, isLoading, isFetching, error };
};
