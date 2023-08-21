import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import startServer from "./server.js";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", authRoute);
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);

startServer(app);
