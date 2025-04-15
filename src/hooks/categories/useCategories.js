import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getCategories } from "../../services/apiCategories.js";
import { PAGE_SIZE } from "../../utils/constants.js";

export const useCategories = () => {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit") ? PAGE_SIZE : Number(searchParams.get("limit"));

  let sortByRow = searchParams.get("sortBy");
  sortByRow = sortByRow && sortByRow !== "undefined" ? sortByRow : "createdAt-desc";

  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["categories", page, sortBy, limit],
    queryFn: () => getCategories({ page, sortBy, limit }),
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
  });

  return { categories: data?.data || [], totalShipsType: data?.count || 0, isLoading, error, isFetching };
};
