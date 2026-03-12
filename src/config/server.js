import "dotenv/config";
import app from "../app.js";
import db from "./db.js";
import { Server } from "socket.io";
import logger from "../utils/logger.js";
import JwtService from "../utils/jwtServices.js";
import { UnauthorizedError } from "../utils/errors.js";

const port = process.env.PORT || 7000;

const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean) || ["http://localhost:3000"];

await db();

const server = app.listen(port, () => {
  logger.info(`🚀 Server running on port ${port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    logger.error(`Port ${port} is already in use. Run: fuser -k ${port}/tcp`);
    process.exit(1);
  }
  logger.error("Server error:", error);
  process.exit(1);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: { origin: allowedOrigins.length ? allowedOrigins : true, credentials: true },
});

// ─── Socket.io JWT authentication middleware ─────────────────────────────────
io.use((socket, next) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers?.authorization?.replace("Bearer ", "");
  if (!token) return next(new UnauthorizedError("No socket auth token"));
  try {
    socket.userId = JwtService.verify(token).id;
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired socket token"));
  }
});

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id} (user: ${socket.userId})`);

  // Join the user's personal room using verified JWT userId
  socket.join(socket.userId);
  socket.broadcast.emit("online-user", socket.userId);

  socket.on("typing", (room) => socket.to(room).emit("typing", room));
  socket.on("stop-typing", (room) => socket.to(room).emit("stop-typing", room));
  socket.on("join-chat", (room) => socket.join(room));
  socket.on("leave-chat", (room) => socket.leave(room));

  socket.on("new-message", (newMessageReceived) => {
    const chat = newMessageReceived?.chat;
    const sender = newMessageReceived?.sender;
    if (!chat?.id || !sender?.id) return;
    socket.to(chat.id).emit("message-received", newMessageReceived);
  });

  socket.on("disconnect", () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});
