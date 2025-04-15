import { useQuery } from "@tanstack/react-query";
import { getAllShipTypes } from "../services/apiCategories.js";

export const useAllShipType = () => {
  const { data } = useQuery({
    queryKey: ["all-shipType"],
    queryFn: getAllShipTypes,
  });

  return { allShipType: data };
};
