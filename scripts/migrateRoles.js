import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "../src/models/userModel.js";

dotenv.config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for migration...");

    // Update users who don't have a role
    const result = await UserModel.updateMany(
      { role: { $exists: false } },
      { $set: { role: "seeker" } }
    );

    console.log(`Updated ${result.modifiedCount} users to 'seeker' role.`);

    // If isAgent was true, set role to 'company'
    const agentResult = await UserModel.updateMany(
      { isAgent: true, role: "seeker" },
      { $set: { role: "company" } }
    );

    console.log(`Updated ${agentResult.modifiedCount} agents to 'company' role.`);

    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

migrate();
