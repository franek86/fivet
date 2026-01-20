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

socket.on("connect_error", (err) => {
  console.error("Socket connect_error:", err.message);
});

export default socket;
