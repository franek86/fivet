import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotificationApi, getAllUnreadNotifications, getNotifications, updateReadNotification } from "../services/apiNotification.js";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

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

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deleteNotificationApi(id),
    onSuccess: () => {
      toast.success("Notification successfully deleted.");
      queryClient.invalidateQueries(["unread-notification,notifications"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate };
};

export const useNotificationSocket = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const socket = io(SOCKET_URL, { withCredentials: true });

    socket.emit("admins");

    socket.on("newShip", (data) => {
      setUnreadCount((prev) => prev + 1);
      setNotifications((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  return { unreadCount, notifications, setNotifications, setUnreadCount };
};
