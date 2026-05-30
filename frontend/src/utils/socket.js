import { io } from "socket.io-client";

const BACKEND_URL = "https://jaum-t3no.onrender.com";

// Create a single global socket instance but don't connect automatically
export const socket = io(BACKEND_URL, {
  autoConnect: false,
});
