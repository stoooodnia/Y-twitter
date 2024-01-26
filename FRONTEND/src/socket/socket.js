import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  postEvents: [],
});

export const socket = io("http://localhost:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  state.connected = true;
  console.log("Connected to WebSocket!!");
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("Disconnected from WebSocket!");
});

socket.on("post", (data) => {
  console.log("post event received: ", data);
  state.postEvents.push(data);
});
