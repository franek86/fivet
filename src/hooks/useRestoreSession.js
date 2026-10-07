import { useQuery } from "@tanstack/react-query";
import { refreshTokenApi } from "../services/apiAuth.js";

export const useRestoreSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: refreshTokenApi,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
