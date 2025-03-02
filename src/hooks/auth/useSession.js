import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getUserSession } from "../../services/apiAuth.js";
import { logoutUser, setUser } from "../../slices/authSlice.js";

export const useSession = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["session"],
    queryFn: getUserSession(),
    onSucess: (session) => {
      if (session) {
        dispatch(setUser({ user: session.user, session }));
      } else {
        dispatch(logoutUser());
      }
    },
    staleTime: Infinity,
  });
};
