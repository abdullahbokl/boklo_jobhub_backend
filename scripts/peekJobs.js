import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const peekJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const jobs = await mongoose.connection.db.collection('jobs').find({}).limit(5).toArray();
    console.log(JSON.stringify(jobs, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

peekJobs();
