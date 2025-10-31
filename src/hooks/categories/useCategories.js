import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories.js";
import { PAGE_SIZE } from "../../utils/constants.js";

export const useCategories = ({ page = 1, limit = PAGE_SIZE, sortBy = "createdAt-desc", search }) => {
  const [field, direction] = sortBy.split("-");
  const sort = `${field}-${direction}`;

  const queryParams = {
    page,
    limit,
    sortBy: sort,
    search,
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["categories", queryParams],
    queryFn: () => getCategories(queryParams),
    keepPreviousData: true,
    staleTime: 30 * 60 * 1000,
  });

  return { categories: data?.data, count: data?.meta?.total, isLoading, error, isFetching };
};
