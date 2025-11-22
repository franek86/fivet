import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socket from "../shared/socket.js";

import { addNotification } from "../slices/notificationSlice.js";

export const useNotificationSocket = (role, userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!role || !userId) return;

    socket.emit("joinUser", userId);

    if (role === "ADMIN") {
      socket.on("newShip", (data) => {
        //dispatch(addNotification(data));
        console.log("Admin notification: ---- ", data);
      });
    }

    if (role === "USER") {
      socket.on("postApproved", (data) => {
        dispatch(addNotification(data));
      });
    }

    return () => {
      if (role === "ADMIN") socket.off("newShip");
      if (role === "USER") socket.off("postApproved");
    };
  }, [userId, dispatch]);
};
