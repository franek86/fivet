import { useMutation } from "@tanstack/react-query";
import { createShip } from "../../services/apiShips.js";
import { toast } from "react-toastify";

export const useCreateShip = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createShip,
    onSuccess: () => {
      toast.success("New ship added");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate, isPending, isSuccess };
};
