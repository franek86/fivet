import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../shared/socket.js";
import { addNotification, setOnlineUsers } from "../slices/realtimeSlice.js";
import { toast } from "react-toastify";

export const useRealtime = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (payload) => {
      const { users, count } = payload;
      const onlineIds = users.map((u) => u.id);

      dispatch(setOnlineUsers({ userIds: onlineIds, count }));

      const onlineSet = new Set(onlineIds);
      queryClient.setQueriesData({ queryKey: ["all-profile"] }, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((user) => ({
          ...user,
          isActive: onlineSet.has(user.id),
        }));
      });
    };

    const newPostHandler = (payload) => {
      let message = `New ship - ${payload.shipTitle} by ${payload.ownerName}`;
      toast.success(message);
      dispatch(
        addNotification({
          ownerName: payload.fullName,
          shipTitle: payload.shipName,
          shipIMO: payload.imo,
          createdAt: payload.createdAt,
          message,
          scope: "ADMIN",
          read: false,
        }),
      );
    };

    socket.on("online-users", handler);
    socket.on("new-ship", newPostHandler);

    return () => {
      socket.off("online-users", handler);
      socket.off("new-post", newPostHandler);
    };
  }, [dispatch, queryClient]);
};
