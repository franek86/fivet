import { useQuery } from "@tanstack/react-query";
import { getShip } from "../../services/apiShips.js";

export const useShip = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ship", id],
    queryFn: () => getShip(id),
    enabled: !!id,
  });

  return { data, isLoading, isError };
};
