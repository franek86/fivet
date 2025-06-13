import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserProfileApi, getAllProfileApi, getProfileApi, updateProfileApi } from "../services/apiProfile.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useProfileData = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
    enabled: !!user,
  });

  return { data, isLoading, isSuccess };
};

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
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["all-profile"],
    queryFn: getAllProfileApi,
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
    staleTime: 30 * 60 * 1000,
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
