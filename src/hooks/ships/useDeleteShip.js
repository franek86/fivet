import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShip } from "../../services/apiShips.js";
import { toast } from "react-toastify";

export const useDeleteShip = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteShip,
    onSuccess: () => {
      queryClient.invalidateQueries(["ships", "statistic"]);
      toast.success("Ship successfully deleted");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate };
};
