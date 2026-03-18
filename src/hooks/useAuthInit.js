import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice.js";
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
            isAuthenticated: true,
          }),
        );
      } catch {
        setAccessToken(null);
        dispatch(
          setUser({
            isAuthenticated: false,
          }),
        );
      }
    };

    initAuth();
  }, [dispatch]);
};
