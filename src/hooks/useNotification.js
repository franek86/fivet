import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUnreadNotifications, getNotifications, updateReadNotification } from "../services/apiNotification.js";
import { toast } from "react-toastify";

export const useNotificationList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  return { data, isLoading, isError };
};

export const useAllUnreadNotification = () => {
  const { data } = useQuery({
    queryKey: ["unread-notification"],
    queryFn: getAllUnreadNotifications,
    refetchInterval: 5000,
  });

  return { data };
};

export const useUpdateReadNotification = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateReadNotification({ id, data }),
    onSuccess: () => {
      toast.success("Notification successfully edited.");
      queryClient.invalidateQueries(["unread-notification,notifications"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending };
};
