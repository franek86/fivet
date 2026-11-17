import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteInqueryApi, fetchMyInquery, saveInquiryContactApi, updateInqueryStatusApi } from "../services/apiInquery.js";
import { useDebounce } from "./useDebounce.js";
import { toast } from "react-toastify";

export const useGetMyInqueries = (params) => {
  const debouncedSearch = useDebounce(params.search, 500);

  const queryParams = {
    ...params,
    search: debouncedSearch,
    status: params.status,
    sortBy: params.sortBy,
    order: params.order,
    page: params.page,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["inqueries", queryParams],
    queryFn: () => fetchMyInquery(queryParams),
    placeholderData: (previousData) => previousData,
  });

  return { data, isLoading, isError };
};

export const useUpdateStatusInquery = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateInqueryStatusApi,
    onSuccess: () => {
      toast.success("Status successfully updated.");
      queryClient.invalidateQueries(["inqueries"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading, isError };
};

export const useDeleteInquery = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteInqueryApi,
    onSuccess: () => {
      toast.success("Inquery successfully deleted.");
      queryClient.invalidateQueries(["inqueries"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading, isError };
};

export const useSaveInquiryContact = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: saveInquiryContactApi,
    onSuccess: () => {
      toast.success("Contact successfully saved to address book.");
      queryClient.invalidateQueries(["addres-book"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading, isError };
};
