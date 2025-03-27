import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getCategories } from "../../services/apiCategories.js";

export const useCategories = () => {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  let sortByRow = searchParams.get("sortBy") || "created_at";
  sortByRow = sortByRow && sortByRow !== "undefined" ? sortByRow : "name-asc";

  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["categories", page, sortBy],
    queryFn: () => getCategories({ page, sortBy }),
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
  });

  return { categories: data?.data || [], count: data?.count || 0, isLoading, error, isFetching };
};
