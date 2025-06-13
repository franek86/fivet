import { useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";

export const useShips = () => {
  const [searchParams] = useSearchParams();
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  let sortByRow = searchParams.get("sortBy");
  sortByRow = sortByRow && sortByRow !== "undefined" ? sortByRow : "createdAt-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["ships", page, role, user?.id, sortBy],
    queryFn: () => getShips({ page, role, userId: user.id, sortBy }),
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
    staleTime: 30 * 60 * 1000,
  });

  return { ships: data?.data || [], count: data?.count || 0, isLoading, error, isFetching };
};
