import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";

export const useShips = () => {
  const [searchParams] = useSearchParams();
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading, error } = useQuery({
    queryKey: ["ships", page, role, user.id],
    queryFn: () => getShips({ page, role, userId: user.id }),
    placeholderData: keepPreviousData,
  });

  return { ships: data?.data || [], count: data?.count || 0, isLoading, error };
};
