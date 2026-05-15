import { useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { PAGE_SIZE } from "../../constants/index.js";

export const useShips = ({ page = 1, limit = PAGE_SIZE, sortBy = "createdAt-desc", filters = {} }) => {
  const [field, direction] = sortBy.split("-");
  const sort = `${field}-${direction}`;

  const queryParams = {
    ...filters,
    sortBy: sort,
    page,
    limit,
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["ships", queryParams],
    queryFn: () => getShips(queryParams),
    keepPreviousData: true,
    staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { ships: data?.data, count: data?.meta?.total, isLoading, isFetching, error };
};
