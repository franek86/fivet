import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteNotificationApi, getAllUnreadNotifications, getNotifications, updateReadNotification } from "../services/apiNotification.js";

export const useNotificationList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  return { data, isLoading, isError };
};

export const useAllUnreadNotification = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["unread-notification"],
    queryFn: getAllUnreadNotifications,
  });

  return { data, isLoading };
};

export const useNotificationCount = () => {
  return useQuery({
    queryKey: ["notification-count"],
    initialData: 0,
    staleTime: Infinity,
    enabled: false, // socket controls this value
  });
};

export const useUpdateReadNotification = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateReadNotification({ id, data }),
    onSuccess: () => {
      toast.success("Notification successfully edited.");
      queryClient.invalidateQueries({
        queryKey: ["unread-notification"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending };
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deleteNotificationApi(id),
    onSuccess: () => {
      toast.success("Notification successfully deleted.");
      queryClient.invalidateQueries(["unread-notification", "notifications"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate };
};
