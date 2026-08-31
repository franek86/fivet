import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../shared/socket.js";
import { toast } from "react-toastify";

export function useAdminSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCreateShipNotify = (payload) => {
      toast.success(`New ship created by ${payload.shipName}`);
      // Refresh blogs list so the "New" label appears
      queryClient.invalidateQueries({ queryKey: ["ships"] });
    };

    const updateUserStatus = (userId, online) => {
      queryClient.setQueriesData({ queryKey: ["all-users"] }, (old) => {
        if (!old) return old;

        if (Array.isArray(old)) {
          return old.map((u) => (u.id === userId ? { ...u, online } : u));
        }

        return old;
      });
    };

    const handleUserOnline = (payload) => {
      updateUserStatus(payload.userId, true);
    };

    const handleUserOffline = (payload) => {
      updateUserStatus(payload.userId, false);
    };

    const handleNotificationNew = (payload) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unread-notification"],
      });
      queryClient.setQueryData(["notification-count"], count);
    };

    const handleNotificationCount = ({ count }) => {
      queryClient.setQueryData(["notification-count"], count);
    };

    socket.on("ship:created", handleCreateShipNotify);
    socket.on("user:online", handleUserOnline);
    socket.on("user:offline", handleUserOffline);
    socket.on("user:count", handleUserOffline);
    socket.on("admin:notification:new", handleNotificationNew);
    socket.on("admin:notification:count", handleNotificationCount);

    return () => {
      socket.off("ship:created", handleCreateShipNotify);
      socket.off("user:online", handleUserOnline);
      socket.off("user:offline", handleUserOffline);
      socket.off("user:count", handleUserOffline);
      socket.off("admin:notification:new", handleNotificationNew);
      socket.off("admin:notification:count", handleNotificationCount);
    };
  }, [queryClient]);
}
