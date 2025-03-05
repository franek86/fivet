import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../services/apiProfile.js";
import { useSelector } from "react-redux";

export const useProfileData = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
    enabled: !!user,
  });

  return { data, isLoading, isSuccess };
};
