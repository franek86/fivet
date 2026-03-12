import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "../slices/authSlice.js";
import { useEffect } from "react";
import { setAccessToken } from "../utils/axiosConfig.js";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await apiClient.post("auth/refresh-token");
        setAccessToken(res.data.accessToken);
        dispatch(
          setUser({
            user: res.data.user,
            role: res.data.role,
            subscription: res.data.subscription,
          }),
        );
      } catch {
        setAccessToken(null);
        dispatch(logoutUser());
      }
    };

    initAuth();
  }, [dispatch]);
};
