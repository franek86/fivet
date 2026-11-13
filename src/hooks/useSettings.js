import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { changeAvatar, changePassword, confirmEmailChange, freezeAccount, requestEmailChange } from "../services/apiSettings.js";
import { toast } from "react-toastify";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
  });
};

export const useRequestEmailChange = () => {
  return useMutation({ mutationFn: requestEmailChange });
};

export const useConfirmEmailChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmEmailChange,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: "user" }),
  });
};

export const useChangeAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Avatar changed!");
    },
  });
};

export const useFreezeAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: freezeAccount,
    onSuccess: () => {
      queryClient.clear();
      navigate("/", { replace: true });
    },
  });
};
