import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserProfileApi, updateProfileApi } from "../services/apiProfile.js";

import { toast } from "react-toastify";
import { getUserApi, updateUserProfileVerification } from "../services/apiUsers.js";

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

export const useGetUserProfile = (params) => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-users", params],
    queryFn: () => getUserApi(params),
    keepPreviousData: true,
  });

  return { data, isLoading };
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

export const useUpdateUserProfileVerification = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfileVerification,

    onSuccess: (_, user) => {
      console.log(user);
      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-profile", user.userId],
      });
      toast.success(`Verification updated to ${user.verificationStatus}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isPending };
};
