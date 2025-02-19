import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditShip } from "../../services/apiShips.js";
import { toast } from "react-toastify";

export const useEditShip = () => {
  const queryClient = useQueryClient();
  const {
    mutate: editShip,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ newData, id }) => createEditShip(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["ships"]);
      toast.success("Succesfully edited");
    },
    onError: (error) => {
      toast.success(error);
    },
  });

  return { editShip, isPending, isError };
};
