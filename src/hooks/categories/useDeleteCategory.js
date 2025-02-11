import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../services/apiCategories.js";
import { toast } from "react-toastify";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate };
};
