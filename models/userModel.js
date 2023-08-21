import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  location: { type: String },
  isAdmin: { type: Boolean, default: false },
  isAgent: { type: Boolean, default: false },
  skills: { type: Array, default: [] },
  bio: { type: String, default: "" },
});

export default mongoose.model("User", UserModel);
