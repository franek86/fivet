import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../shared/socket.js";
import { addNotification, setOnlineUsers } from "../slices/realtimeSlice.js";
import { toast } from "react-toastify";

export const useRealtime = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnlineUsers = (payload) => {
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

    const newShipHandler = (payload) => {
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

    const shipPublished = (payload) => {
      let message = `Your ship - ${payload.shipTitle} has been published`;
      toast.success(message);
      dispatch(
        addNotification({
          shipTitle: payload.shipName,
          createdAt: payload.createdAt,
          message,
          scope: "USER",
          read: false,
        }),
      );
    };
    // Make sure socket is connected before subscribing
    if (!socket.connected) socket.connect();

    socket.on("online-users", handleOnlineUsers);
    socket.on("new-ship", newShipHandler);
    socket.on("ship-published", shipPublished);

    return () => {
      socket.off("online-users", handleOnlineUsers);
      socket.off("new-ship", newShipHandler);
      socket.off("ship-published", shipPublished);
    };
  }, [dispatch, queryClient]);
};
