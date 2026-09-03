import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import socket from "../shared/socket.js";

export function useUserSocket(userId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const handlePublishedShipNotify = () => {
      queryClient.invalidateQueries({ queryKey: ["ships"] });
      /*  queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-notification"] });
      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      }); */
    };

    const handleNewNotification = ({ notification, unreadCount }) => {
      console.log("🔔 NEW NOTIFICATION", {
        notification,
        unreadCount,
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unread-notification"],
      });

      /*  queryClient.setQueryData(["unread-notification"], (oldData) => {
        console.log(oldData);
        if (!oldData) return oldData;
        return {
          ...oldData,
          notifications: [notification, ...oldData.notifications],
          unreadCount,
        };
      }); */
    };

    /*  const handleNotificationCount = ({ count }) => {
      queryClient.setQueryData(["notification-count"], count);
    }; */

    socket.on("ship:published", handlePublishedShipNotify);
    socket.on("user:notification:new", handleNewNotification);
    /*  socket.on("user:notification:count", handleNotificationCount); */

    return () => {
      socket.off("ship:published", handlePublishedShipNotify);
      socket.off("user:notification:new", handleNewNotification);
      /* socket.off("user:notification:count", handleNotificationCount); */
    };
  }, [queryClient]);
}
