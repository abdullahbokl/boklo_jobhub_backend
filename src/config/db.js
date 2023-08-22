import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URL;

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
    return connection;
  } catch (error) {
    console.error("MongoDB Connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
