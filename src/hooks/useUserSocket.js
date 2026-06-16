import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import socket from "../shared/socket.js";

export function useUserSocket(userId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handlePublishedShipNotify = (payload) => {
      queryClient.invalidateQueries({ queryKey: ["ships"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-notification"] });
      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      });
    };

    const handleNotificationNew = (payload) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unread-notification"],
      });
      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      });
    };

    const handleNotificationCount = ({ count }) => {
      queryClient.setQueryData(["notification-count"], count);
    };

    socket.on("ship:published", handlePublishedShipNotify);
    socket.on("user:notification:new", handleNotificationNew);
    socket.on("user:notification:count", handleNotificationCount);

    return () => {
      socket.off("ship:published", handlePublishedShipNotify);
      socket.off("user:notification:new", handleNotificationNew);
      socket.off("user:notification:count", handleNotificationCount);
    };
  }, [queryClient]);
}
