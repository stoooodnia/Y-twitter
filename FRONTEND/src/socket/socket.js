import { io } from "socket.io-client";
import { useNotificationStore } from "@/stores/notificationStore";

const notificationStore = useNotificationStore();

// used to send events
export const socket = io("https://localhost:3000", {
  withCredentials: true,
});

// receiving events
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
  notificationStore.addNewPost();
});

socket.on("follow", (data) => {
  console.log("follow event received: ", data);
  const notification = {
    user: data.follower,
    createdAt: data.createdAt,
  };
  console.log("notification: ", notification);
  notificationStore.addNotification(notification);
});
