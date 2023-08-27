import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  profilePic: {
    type: [
      {
        url: String,
        uploadedAt: {
          type: String,
          default: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      },
    ],
  },
  location: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  isAgent: {
    type: Boolean,
  },
  skills: {
    type: Array,
  },
  bio: {
    type: String,
  },
});

export default mongoose.model("User", UserModel);
