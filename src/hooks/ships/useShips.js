import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShips } from "../../services/apiShips.js";
import { useSearchParams } from "react-router";

export const useShips = () => {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data, isLoading, error } = useQuery({
    queryKey: ["ships", page],
    queryFn: () => getShips(page),
    placeholderData: keepPreviousData,
  });

  return { ships: data?.data || [], count: data?.count || 0, isLoading, error };
};
