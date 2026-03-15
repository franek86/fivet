import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserProfileApi, getAllProfileApi, updateProfileApi } from "../services/apiProfile.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useUpdateProfile = (user) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (updatedData) => updateProfileApi(updatedData, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};

export const useGetAllUserProfile = () => {
  const searchTerm = useSelector((state) => state.search.term);
  const search = searchTerm?.trim() || undefined;

  const { data, isPending, isFetching } = useQuery({
    queryKey: ["all-profile", search],
    queryFn: () => getAllProfileApi({ search }),
    keepPreviousData: true,
  });
  return { data, isPending, isFetching };
};

export const useDeleteUserProfile = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deleteUserProfileApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
};
