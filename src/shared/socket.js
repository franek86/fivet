// src/socket.js
import { io } from "socket.io-client";

// your backend URL
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"],
  reconnection: true,
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("Socket connect_error:", err.message);
});

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}

export function connectSocket() {
  if (!socket.connected) {
    socket.connect();
  }
}

export default socket;
