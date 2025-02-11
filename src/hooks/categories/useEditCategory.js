import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { createEditCategory } from "../../services/apiCategories.js";

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  const {
    mutate: editMutate,
    isPending: editIsPending,
    isSuccess: editIsSuccess,
  } = useMutation({
    mutationFn: ({ newCategory, id }) => createEditCategory(newCategory, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Successfully edit category");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { editMutate, editIsPending, editIsSuccess };
};
