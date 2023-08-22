import mongoose from "mongoose";

const JobModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
    contract: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: {
      type: Array,
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one requirement must be specified.",
      },
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobModel);
