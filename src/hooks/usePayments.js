import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePayment, getPayments } from "../services/apiPayments.js";
import { toast } from "react-toastify";

export const useGetPayments = () => {
  const queryParams = {};

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["payments", queryParams],
    queryFn: () => getPayments(queryParams),
    keepPreviousData: true,
  });

  return { data: data?.payload, count: data?.meta?.total, isLoading, isError, isFetching };
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deletePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["payments"]);
      toast.success("Payment deleted successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { mutate };
};
