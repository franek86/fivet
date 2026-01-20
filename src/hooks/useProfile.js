import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserProfileApi, getAllProfileApi, updateProfileApi } from "../services/apiProfile.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useUpdateProfile = () => {
  const user = useSelector((state) => state.auth.user);
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

  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["all-profile", search],
    queryFn: () => getAllProfileApi({ search }),
    keepPreviousData: true,
    /* placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    }, */

    /* staleTime: 30 * 60 * 1000, */
  });
  return { data, isPending, isError, isFetching };
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
