import { useQuery } from "@tanstack/react-query";
import { getAllShipTypes } from "../services/apiCategories.js";

export const useAllShipType = () => {
  const { data } = useQuery({
    queryKey: ["all-shipType"],
    queryFn: getAllShipTypes,
    staleTime: 30 * 60 * 1000,
  });

  return { allShipType: data };
};
