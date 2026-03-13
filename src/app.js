import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import bookmarkRoute from "./routes/bookmarkRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messagesRoute from "./routes/messagesRoute.js";
import imagesRoute from "./routes/imagesRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { requestId } from "./middleware/requestId.js";
import { sanitizeRequest } from "./middleware/sanitizeRequest.js";
import logger, { morganStream } from "./utils/logger.js";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
const corsOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean);

// ─── Core middleware ─────────────────────────────────────────────────────────
app.use(requestId);
app.use((req, res, next) => {
  console.log("--------------------------------------------------");
  console.log(`📡 NEW REQUEST: ${req.method} ${req.originalUrl}`);
  console.log("--------------------------------------------------");
  logger.info(`🔍 Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use(helmet());
app.use(cors({ origin: corsOrigins?.length ? corsOrigins : true, credentials: true }));

// ─── Rate limiting ───────────────────────────────────────────────────────────
const isDev = process.env.NODE_ENV === "development";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev, // ⬅ no rate limiting in dev
});



if (!isDev) app.use(limiter);
app.use(express.json({ limit: "10mb" }));
app.use(sanitizeRequest); // NoSQL injection protection
app.use(morgan("combined", { stream: morganStream }));

app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "JobHub backend is running." });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

// ─── API Documentation ────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  logger.info("📚 Swagger docs available at /api-docs");
}

// ─── Versioned Routes ─────────────────────────────────────────────────────────
app.use("/api/v1", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/jobs", jobRoute);
app.use("/api/v1/bookmarks", bookmarkRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/messages", messagesRoute);
app.use("/api/v1/images", imagesRoute);
app.use("/api/v1/applications", applicationRoute);

// ─── Error handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
