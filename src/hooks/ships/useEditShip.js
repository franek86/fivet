import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditShip } from "../../services/apiShips.js";
import { toast } from "react-toastify";

export const useEditShip = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ newData, id }) => createEditShip(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["ships", "ship"]);
      toast.success("Succesfully edited");
      //navigate("/ships");
    },
    onError: (error) => {
      toast.success(error);
    },
  });

  return { mutate, isPending, isError };
};
