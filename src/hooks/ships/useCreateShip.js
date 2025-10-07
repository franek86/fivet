import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createEditShip } from "../../services/apiShips.js";
import { toast } from "react-toastify";

export const useCreateShip = () => {
  const navigate = useNavigate();
  const clientQuery = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createEditShip,
    onSuccess: () => {
      toast.success("New ship added");
      clientQuery.invalidateQueries(["ships", "statistic"]);
      navigate("/ships");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate, isPending, isSuccess };
};
