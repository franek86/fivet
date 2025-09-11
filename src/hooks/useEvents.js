import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEventApi, getAllEventsApi } from "../services/apiEvents.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { closeModalByName } from "../slices/modalSlice.js";

export const useCreateEvent = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (newData) => createEventApi(newData),
    onSuccess: () => {
      toast.success("Event successfully added");
      dispatch(closeModalByName("event"));
      queryClient.invalidateQueries(["events"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isSuccess, isError };
};

export const useGetAllEvents = () => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEventsApi(),
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
    staleTime: 30 * 60 * 1000,
  });

  return { data, isError, isPending };
};
