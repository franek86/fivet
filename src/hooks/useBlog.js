import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { createBlogApi } from "../services/apiBlog.js";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createBlogApi,
    onSuccess: () => {
      toast.success("Blog successfully created");
      queryClient.invalidateQueries(["blogs"]);
      Navigate("/blog/list");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
