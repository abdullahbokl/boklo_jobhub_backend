import app from "../app.js";
import db from "./db.js";
import { Server } from "socket.io";

const port = process.env.PORT || 7000;
const server = app
  .listen(port, async () => {
    await db();
  })
  .on("listening", () => {
    console.log(`Listening on port ${port}`);
  })
  .on("error", (error) => {
    console.error(error);
  });

const socket = new Server(server, {
  cors: {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:" + process.env.PORT,
    },
  },
});

socket.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.broadcast.emit("online-user", userId);
    console.log("online-user", userId);
  });

  socket.on("typing", (room) => {
    console.log("typing", room);
    socket.to(room).emit("typing", room);
  });

  socket.on("stop-typing", (room) => {
    console.log("stop-typing", room);
    socket.to(room).emit("stop-typing", room);
  });

  socket.on("join-chat", (room) => {
    console.log("join-chat", room);
    socket.join(room);
  });

  socket.on("leave-chat", (room) => {
    console.log("leave-chat", room);
    socket.leave(room);
  });

  socket.on("new-message", (newMessageReceived) => {
    console.log("new-message", newMessageReceived);
    const chat = newMessageReceived.chat;
    const room = chat.id;
    const sender = newMessageReceived.sender;

    if (!sender || !sender.id) {
      return console.log("sender not found");
    }

    const senderId = sender.id.toString();
    console.log("senderId", senderId);
    const chatUsers = chat.users;

    if (!chatUsers) {
      return console.log("chatUsers not found");
    }

    socket.to(room).emit("message-received", newMessageReceived);
    socket.to(room).emit("message sent", "New message sent");
  });

  socket.off("setup", (userId) => {
    console.log("offline-user", userId);
    socket.leave(userId);
  });
});
