import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { logoutUser, setUser } from "../slices/authSlice.js";
import { getCurrentUser, logoutUserApi } from "../services/apiAuth.js";

export const useUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser();
      dispatch(setUser({ role: user.role, subscription: user.subscription, user }));
      return user;
    },
    /*  refetchOnWindowFocus: false,
    refetchInterval: 4 * 60 * 1000, */
  });

  return { data, isLoading };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      dispatch(logoutUser());
      toast.success("Your are logged out!");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });
};
