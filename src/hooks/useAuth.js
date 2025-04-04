import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser, setUser } from "../slices/authSlice.js";
import { createUserRoleApi, getCurrentUser, logoutUserApi } from "../services/apiAuth.js";
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

export const useCreateUserRole = () => {
  const { mutate } = useMutation({
    mutationFn: (newData) => createUserRoleApi(newData),
    onSuccess: () => {
      console.log("User role created");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  return { mutate };
};
