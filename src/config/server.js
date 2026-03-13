import "dotenv/config";
import app from "../app.js";
import db from "./db.js";
import { Server } from "socket.io";
import logger from "../utils/logger.js";
import JwtService from "../utils/jwtServices.js";
import { UnauthorizedError } from "../utils/errors.js";

const port = process.env.PORT || 7000;

// Improved origin parsing
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
    : ["http://localhost:7000", "http://10.0.2.2:7000"];

await db();

const server = app.listen(port, () => {
    logger.info(`🚀 Server running on port ${port}`);
});

// Socket.io initialization
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: allowedOrigins, // Socket.io accepts an array of strings directly
        credentials: true
    },
});

// ─── Socket.io Middleware ─────────────────────────────────
io.use((socket, next) => {
    // Check auth object first, then headers
    const token = socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) return next(new UnauthorizedError("Authentication token missing"));

    try {
        const decoded = JwtService.verify(token);
        socket.userId = decoded.id;
        next();
    } catch (err) {
        logger.error(`Socket Auth Error: ${err.message}`);
        next(new UnauthorizedError("Invalid or expired socket token"));
    }
});

io.on("connection", (socket) => {
    // Use a descriptive log for debugging
    logger.info(`User Connected | Socket: ${socket.id} | UserID: ${socket.userId}`);

    socket.join(socket.userId);
    socket.broadcast.emit("online-user", socket.userId);

    socket.on("join-chat", (chatId) => {
        if (!chatId) return;
        socket.join(chatId);
    });

    socket.on("typing", (payload) => {
        const chatId = typeof payload === "string" ? payload : payload?.chatId;
        if (!chatId) return;
        socket.to(chatId).emit("typing", socket.userId);
    });

    socket.on("stop-typing", (payload) => {
        const chatId = typeof payload === "string" ? payload : payload?.chatId;
        if (!chatId) return;
        socket.to(chatId).emit("stop-typing", socket.userId);
    });

    // Consider adding a 'try-catch' or validation inside event listeners
    socket.on("new-message", (newMessageReceived) => {
        const chatId =
            newMessageReceived?.chat?.id ||
            newMessageReceived?.chat?._id ||
            newMessageReceived?.chatId;
        if (!chatId) return;

        // Broadcast to the room excluding the sender
        socket.to(chatId).emit("message-received", newMessageReceived);
    });

    socket.on("disconnect", (reason) => {
        logger.info(`Socket disconnected: ${socket.id} (Reason: ${reason})`);
        socket.broadcast.emit("offline-user", socket.userId);
    });
});

// ─── Clean Shutdown ───────────────────────────────────────
process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Closing server...");
    server.close(() => {
        logger.info("Process terminated.");
        process.exit(0);
    });
});