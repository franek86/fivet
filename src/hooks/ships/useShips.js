import { useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { PAGE_SIZE } from "../../utils/constants.js";

export const useShips = ({ pageNumber = 1, pageSize = PAGE_SIZE, sortBy = "createdAt-desc", filters = {} }) => {
  const [field, direction] = sortBy.split("-");
  const sort = `${field}-${direction}`;

  const queryParams = {
    ...filters,
    sortBy: sort,
    pageNumber,
    pageSize,
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["ships", queryParams],
    queryFn: () => getShips(queryParams),
    keepPreviousData: true,
  });

  return { ships: data?.data ?? [], count: data?.count ?? 0, isLoading, isFetching, error };
};
