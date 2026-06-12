import { useEffect } from "react";

import socket from "../shared/socket.js";
import { getAccessToken } from "../services/axiosConfig.js";

export function useSocketAuth() {
  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      socket.disconnect();
      return;
    }

    socket.auth = { token };

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);
}
