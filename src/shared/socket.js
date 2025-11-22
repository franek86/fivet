// src/socket.js
import { io } from "socket.io-client";

// your backend URL
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"],
  reconnection: true,
});

export default socket;
