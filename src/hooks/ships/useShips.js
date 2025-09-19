import { useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";

export const useShips = () => {
  const [searchParams] = useSearchParams();
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const searchTerm = useSelector((state) => state.search.term);

  const page = Number(searchParams.get("page") || 1);

  const sortByRow = searchParams.get("sortBy") || "createdAt-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const filters = {
    isPublished: searchParams.get("isPublished") || undefined,
    price: searchParams.get("price") || undefined,
    search: searchTerm?.trim() || undefined,
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["ships", page, role, user?.id, sortBy, filters, searchTerm],
    queryFn: () => getShips({ page, role, userId: user.id, sortBy, filters }),
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
    staleTime: 0,
  });

  return { ships: data?.data || [], count: data?.count || 0, isLoading, error, isFetching };
};
