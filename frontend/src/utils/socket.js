import { io } from "socket.io-client";

const BACKEND_URL = "http://localhost:5000";

// Create a single global socket instance but don't connect automatically
export const socket = io(BACKEND_URL, {
  autoConnect: false,
});
