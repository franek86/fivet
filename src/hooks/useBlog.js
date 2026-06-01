import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createBlogApi, getBlogsApi, deleteBlogApi, getBlogApi, updateBlogApi } from "../services/apiBlog.js";

export const useCreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createBlogApi,
    onSuccess: () => {
      toast.success("Blog successfully created");
      queryClient.invalidateQueries(["blogs"]);
      navigate("/blogs");
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
    queryFn: () => getBlogsApi(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isFetching };
};

export const useGetBlog = (slug) => {
  const { data, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogApi(slug),
  });
  return { data, isLoading };
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, form }) => updateBlogApi(id, form),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id]);
      toast.success("Blog successfully updated");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return { mutate, isLoading };
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      toast.success("Blog successfully deleted");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate, isPending };
};
