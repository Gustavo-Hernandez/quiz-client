import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

let socket;
export const initiateSocket = (room, username) => {
  socket = io(ENDPOINT);
  console.log("Connecting socket ...");
  if (socket && room) {
    socket.emit("join_room", { username, room });
  }
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket ...");
  if (socket) {
    socket.disconnect();
  }
};

export const subscribeToChat = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on("message", (msg) => {
    console.log("Web Message Received");
    return cb(null, msg);
  });
};

export const sendMessage = (sender, message, room) => {
  if (socket) {
    socket.emit("chatMessage", { sender, message, room });
  }
};

export const sendReaction = (message, room) => {
  if (socket) {
    socket.emit("reactionMessage", { message, room });
  }
};

export const sendFeedback = (value) => {
  if (socket) {
    socket.emit("teacher_feedback", value);
  }
};
