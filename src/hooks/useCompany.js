import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getCompanyProfileApi, updateCompanyProfileApi } from "../services/apiCompany.js";

export const useGetCompanyProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: getCompanyProfileApi,
  });

  return { data, isLoading };
};

export const useEditCompanyProfile = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateCompanyProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["company", "user-profile"]);
      toast.success("Company successfully updated");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return { mutate, isPending };
};
