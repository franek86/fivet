import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getCategories } from "../../services/apiCategories.js";

export const useCategories = () => {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  let sortByRow = searchParams.get("sortBy") || "name-asc";
  sortByRow = sortByRow && sortByRow !== "undefined" ? sortByRow : "name-asc";

  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", page, sortBy],
    queryFn: () => getCategories({ page, sortBy }),
  });

  return { categories: data?.data || [], count: data?.count || 0, isLoading, error };
};
