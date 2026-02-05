import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../shared/socket.js";

export function useSocketAuth() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !socket.connected) {
      //console.log("Connecting socket for authenticated user...");
      socket.connect();
    }

    // Optional: disconnect on logout
    return () => {
      if (!isAuthenticated && socket.connected) {
        //console.log("Disconnecting socket for logout...");
        socket.emit("logout");
        socket.disconnect();
      }
    };
  }, [isAuthenticated]);
}
