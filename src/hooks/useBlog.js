import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createBlogApi, getBlogApi } from "../services/apiBlog.js";

export const useCreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createBlogApi,
    onSuccess: () => {
      toast.success("Blog successfully created");
      queryClient.invalidateQueries(["blogs"]);
      navigate("/blog/list");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};

export const useGetBlogs = (params) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogApi(params),
    keepPreviousData: true,
  });

  return { data, isLoading, isFetching };
};
