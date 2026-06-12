import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../shared/socket.js";

export function useAdminSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const updateUserStatus = (userId, online) => {
      queryClient.setQueriesData({ queryKey: ["all-profile"] }, (old) => {
        if (!old) return old;

        if (Array.isArray(old)) {
          console.log(old);
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

    socket.on("user:online", handleUserOnline);
    socket.on("user:offline", handleUserOffline);
    socket.on("user:count", handleUserOffline);

    return () => {
      socket.off("user:online", handleUserOnline);
      socket.off("user:offline", handleUserOffline);
      socket.off("user:count", handleUserOffline);
    };
  }, [queryClient]);
}
