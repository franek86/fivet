import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { getCurrentUser, logoutUserApi } from "../services/apiAuth.js";
import { setUser } from "../slices/authSlice.js";
import { useDispatch } from "react-redux";

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await getCurrentUser();

        return user;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  return { data, isLoading };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      dispatch(setUser({ isAuthenticated: false, user: null }));

      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();

      toast.success("Your are logged out!");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });
};
