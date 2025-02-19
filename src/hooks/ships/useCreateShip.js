import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditShip } from "../../services/apiShips.js";
import { toast } from "react-toastify";

export const useCreateShip = () => {
  const clientQuery = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createEditShip,
    onSuccess: () => {
      toast.success("New ship added");
      clientQuery.invalidateQueries(["ships"]);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate, isPending, isSuccess };
};
