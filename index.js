import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import startServer from "./server.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import bookmarkRoute from "./routes/bookmarkRoute.js";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", authRoute);
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/bookmarks", bookmarkRoute);

startServer(app);
