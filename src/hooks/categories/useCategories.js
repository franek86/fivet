import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories.js";
import { PAGE_SIZE } from "../../utils/constants.js";

export const useCategories = ({ pageNumber = 1, pageSize = PAGE_SIZE, sortBy = "createdAt-desc", search }) => {
  const [field, direction] = sortBy.split("-");
  const sort = `${field}-${direction}`;

  const queryParams = {
    sortBy: sort,
    pageNumber,
    pageSize,
    search,
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["categories", queryParams],
    queryFn: () => getCategories(queryParams),
    keepPreviousData: true,
    staleTime: 30 * 60 * 1000,
  });

  return { categories: data?.data || [], totalShipsType: data?.count || 0, isLoading, error, isFetching };
};
