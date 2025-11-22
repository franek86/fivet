import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishShipApi } from "../../services/apiShips.js";
import { toast } from "react-toastify";

export const usePublishShip = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, isPublished, userId }) => publishShipApi(id, isPublished, userId),
    onSuccess: () => {
      toast.success("Ship successfully published");
      queryClient.invalidateQueries(["ships"]);
    },
    onError: () => {
      toast.success(error.message || "Failed to publish ship");
    },
  });
  return { mutate, isPending };
};
