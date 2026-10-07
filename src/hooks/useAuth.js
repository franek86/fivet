import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { getCurrentUser, logoutUserApi } from "../services/apiAuth.js";

import { disconnectSocket } from "../shared/socket.js";
import { setAccessToken } from "../services/axiosConfig.js";

export const useUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: Infinity,
  });

  return { data, isLoading, isError, isAuthenticated: !!data };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      setAccessToken(null);

      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();

      toast.success("Your are logged out!");
      navigate("/", { replace: true });
      disconnectSocket();
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });
};
