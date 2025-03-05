import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../services/apiProfile.js";

export const useProfileData = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });

  return { data, isLoading, isSuccess };
};
