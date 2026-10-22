import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories.js";

export const useCategories = (filters) => {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["categories", filters],
    queryFn: () => getCategories(filters),
    keepPreviousData: true,
    staleTime: 30 * 60 * 1000,
  });

  return { categories: data?.data, count: data?.meta?.total, isLoading, error, isFetching };
};
