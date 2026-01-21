import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../shared/socket.js";
import { setOnlineUsers } from "../slices/realtimeSlice.js";

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

    socket.on("online-users", handler);

    return () => {
      socket.off("online-users", handler);
    };
  }, [dispatch, queryClient]);
};
