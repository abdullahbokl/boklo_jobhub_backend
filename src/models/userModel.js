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
  fullName: { type: String },
  phone: { type: String },
  profilePic: [
    {
      url: String,
      uploadedAt: {
        type: String,
        default: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
    },
  ],
  bookmarks: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
      createdAt: {
        type: String,
        default: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
    },
  ],
  location: { type: String },
  role: {
    type: String,
    enum: ["seeker", "company", "admin"],
    default: "seeker",
  },
  // Company-only fields
  companyName: { type: String },
  industry: { type: String },
  website: { type: String },
  companySize: { type: String },
  isAdmin: { type: Boolean, default: false },
  isAgent: { type: Boolean, default: false },
  skills: { type: Array },
  experience: {
    type: [
      {
        title: { type: String, trim: true },
        company: { type: String, trim: true },
        startDate: { type: String, trim: true },
        endDate: { type: String, trim: true },
        description: { type: String, trim: true },
      },
    ],
    default: [],
  },
  education: {
    type: [
      {
        school: { type: String, trim: true },
        degree: { type: String, trim: true },
        fieldOfStudy: { type: String, trim: true },
        startDate: { type: String, trim: true },
        endDate: { type: String, trim: true },
      },
    ],
    default: [],
  },
  bio: { type: String },
  refreshToken: { type: String, default: null },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// For backward compatibility with existing code that checks isAgent
UserModel.virtual("is_agent").get(function () {
  return this.role === "company" || this.isAgent;
});


export default mongoose.model("User", UserModel);
