import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogCategoryApi } from "../services/apiBlogCategory.js";
import { toast } from "react-toastify";

export const useCreateBlogCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createBlogCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["blog-categories"]);
      toast.success("New blog category created");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate, isPending, isSuccess };
};
