import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser, setUser } from "../slices/authSlice.js";
import { getCurrentUser, logoutUserApi } from "../services/apiAuth.js";
import { toast } from "react-toastify";

export const useUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser();
      dispatch(setUser({ role: user.role, user }));
      return user;
    },
    /* staleTime: 1000 * 60 * 5, */
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
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });
};
