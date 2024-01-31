import { io } from "socket.io-client";
import { useNotificationStore } from "@/stores/notificationStore";

const notificationStore = useNotificationStore();

export const socket = io("https://localhost:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  notificationStore.connected = true;
  console.log("Connected to WebSocket!!");
});

socket.on("disconnect", () => {
  notificationStore.connected = false;
  console.log("Disconnected from WebSocket!");
});

socket.on("post", (data) => {
  console.log("post event received: ", data);
  notificationStore.addNotification(data);
});
