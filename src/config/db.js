import "dotenv/config";
import mongoose from "mongoose";

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

const connectToDatabase = async () => {
  try {
    const { mongoUrl, dbName } = getConnectionConfig();
    const isDev = process.env.NODE_ENV === "development";
    const connection = await mongoose.connect(mongoUrl, {
      dbName: dbName || undefined,
      serverSelectionTimeoutMS: 10000,
      // ─── Connection pool — protects Atlas from request bursts ───────────────
      maxPoolSize: isDev ? 5 : 10,   // max concurrent DB connections
      minPoolSize: 1,                 // keep at least 1 alive
      maxIdleTimeMS: 30000,           // close idle connections after 30s
    });

    console.log(`MongoDB connected: ${getSafeConnectionLabel(mongoUrl, connection.connection.name)}`);
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectToDatabase;
