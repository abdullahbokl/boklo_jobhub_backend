import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "../src/models/userModel.js";

dotenv.config();

const peek = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const users = await UserModel.find({}).limit(5);
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

peek();
