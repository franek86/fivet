import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlogCategoryApi, getBlogCategoriesApi } from "../services/apiBlogCategory.js";
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

export const useGetBlogCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: getBlogCategoriesApi,
    staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  return { data, isLoading };
};
