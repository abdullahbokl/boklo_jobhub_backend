import mongoose from "mongoose";
import { applicationStatuses, normalizeApplicationStatus } from "../utils/applicationStatus.js";
const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: applicationStatuses,
      default: "applied",
    },
  },
  { timestamps: true }
);
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
applicationSchema.pre("save", function normalizeStatusBeforeSave(next) {
  this.status = normalizeApplicationStatus(this.status);
  next();
});
function normalizeStatusBeforeUpdate() {
  const update = this.getUpdate() || {};
  if (update.status) {
    update.status = normalizeApplicationStatus(update.status);
  }
  if (update.$set?.status) {
    update.$set.status = normalizeApplicationStatus(update.$set.status);
  }
  this.setUpdate(update);
}
applicationSchema.pre("findOneAndUpdate", normalizeStatusBeforeUpdate);
applicationSchema.pre("updateOne", normalizeStatusBeforeUpdate);
applicationSchema.pre("updateMany", normalizeStatusBeforeUpdate);
export default mongoose.model("Application", applicationSchema);
