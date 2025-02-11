import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCategory } from "../../services/apiCategories.js";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createEditCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("New category added");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate, isPending, isSuccess };
};
