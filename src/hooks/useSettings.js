import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { changeAvatar, changePassword, confirmEmailChange, freezeAccount, requestEmailChange } from "../services/apiSettings.js";

export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}

export function useRequestEmailChange() {
  return useMutation({ mutationFn: requestEmailChange });
}

export function useConfirmEmailChange() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmEmailChange,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: "user" }),
  });
}

export function useChangeAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: "user" }),
  });
}

export function useFreezeAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: freezeAccount,
    onSuccess: () => {
      queryClient.clear();
      navigate("/", { replace: true });
    },
  });
}
