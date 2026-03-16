import "dotenv/config";
import mongoose from "mongoose";

const dbState = {
  connected: false,
  lastError: null,
  lastAttemptAt: null,
};

let listenersBound = false;

const bindConnectionListeners = () => {
  if (listenersBound) return;

  mongoose.connection.on("connected", () => {
    dbState.connected = true;
    dbState.lastError = null;
  });

  mongoose.connection.on("disconnected", () => {
    dbState.connected = false;
  });

  mongoose.connection.on("error", (error) => {
    dbState.connected = false;
    dbState.lastError = error?.message || "Unknown MongoDB connection error";
  });

  listenersBound = true;
};

const getConnectionConfig = () => {
  const mongoUrl = process.env.MONGO_URL?.trim();
  const dbName = process.env.MONGO_DB_NAME?.trim();

  if (!mongoUrl) {
    throw new Error("MONGO_URL is not set. Add it to your .env file before starting the backend.");
  }

  return { mongoUrl, dbName };
};

const getSafeConnectionLabel = (mongoUrl, dbName) => {
  try {
    const url = new URL(mongoUrl);
    return `${url.hostname}${dbName ? `/${dbName}` : ""}`;
  } catch {
    return dbName ? `MongoDB/${dbName}` : "MongoDB";
  }
};

export const getDatabaseStatus = () => ({
  connected: dbState.connected,
  lastError: dbState.lastError,
  lastAttemptAt: dbState.lastAttemptAt,
  readyState: mongoose.connection.readyState,
});

export const isDatabaseReady = () => dbState.connected;

const connectToDatabase = async ({ throwOnError = true } = {}) => {
  try {
    bindConnectionListeners();

    const { mongoUrl, dbName } = getConnectionConfig();
    const isDev = process.env.NODE_ENV === "development";
    dbState.lastAttemptAt = new Date().toISOString();

    const connection = await mongoose.connect(mongoUrl, {
      dbName: dbName || undefined,
      serverSelectionTimeoutMS: 10000,
      // ─── Connection pool — protects Atlas from request bursts ───────────────
      maxPoolSize: isDev ? 5 : 10,   // max concurrent DB connections
      minPoolSize: 1,                 // keep at least 1 alive
      maxIdleTimeMS: 30000,           // close idle connections after 30s
    });

    dbState.connected = true;
    dbState.lastError = null;
    console.log(`MongoDB connected: ${getSafeConnectionLabel(mongoUrl, connection.connection.name)}`);
    return connection;
  } catch (error) {
    dbState.connected = false;
    dbState.lastError = error.message;
    console.error("MongoDB connection error:", error.message);
    if (throwOnError) {
      throw error;
    }

    return null;
  }
};

export default connectToDatabase;
