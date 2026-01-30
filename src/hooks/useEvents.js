import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEventApi, deleteEventByIdApi, getAllEventsApi, singleEventApi, updateEventByIdApi } from "../services/apiEvents.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { closeModalByName } from "../slices/modalSlice.js";
import { setIsDrawerClose } from "../slices/uiSlice.js";

export const useCreateEvent = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (newData) => createEventApi(newData),
    onSuccess: () => {
      toast.success("Event successfully added");
      dispatch(setIsDrawerClose());
      queryClient.invalidateQueries(["events"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isSuccess, isError };
};

export const useGetAllEvents = () => {
  const searchTerm = useSelector((state) => state.search.term);
  const search = searchTerm?.trim() || undefined;
  /*  const filters = {
    const [searchParams, setSearchParams] = useSearchParams();
    status: searchParams.get("status") || undefined,
    priority: searchParams.get("priority") || undefined,
    search: searchParams.get("search") || undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
    page: searchParams.get("page") || 1,
    pageSize: searchParams.get("pageSize") || 10,
  }; 

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === undefined || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    if (key !== "page") newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    const defaultParams = new URLSearchParams();
    setSearchParams(defaultParams);
  };*/

  const { data, isLoading } = useQuery({
    queryKey: ["events", search],
    queryFn: () => getAllEventsApi(search),
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
  });

  return { data, isLoading };
};

export const useEditEvent = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ id, data }) => updateEventByIdApi({ id, data }),
    onSuccess: () => {
      toast.success("Event successfully updated");
      dispatch(closeModalByName("event-edit"));
      queryClient.invalidateQueries(["events", "recent-events"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, isError };
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deleteEventByIdApi(id),
    onSuccess: () => {
      toast.success("Event deleted.");
      queryClient.invalidateQueries(["events", "recent-events"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate };
};

export const useGetSingleEvent = (id) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["single-event", id],
    queryFn: () => singleEventApi(id),
  });
  return { data, isError, isLoading };
};
