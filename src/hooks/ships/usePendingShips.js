import { useQuery } from "@tanstack/react-query";
import { getPendingShips } from "../../services/apiShips.js";

export const usePendingShips = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pending-ship"],
    queryFn: getPendingShips,
  });

  return { data, isLoading, isError };
};
