import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../shared/socket.js";
import { getAccessToken } from "../utils/axiosConfig.js";

export function useSocketAuth() {
  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      socket.auth = { token }; // attach token before connecting
      if (!socket.connected) socket.connect();
    } else {
      if (socket.connected) {
        socket.emit("logout");
        socket.disconnect();
      }
    }

    // Optional: cleanup on unmount
    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);
}
