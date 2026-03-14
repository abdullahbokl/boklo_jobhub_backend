import mongoose from "mongoose";

function parseSalaryValue(salary) {
  if (salary == null) return 0;
  const matches = String(salary)
    .match(/\d+(?:\.\d+)?/g)
    ?.map(Number)
    .filter((item) => Number.isFinite(item));

  if (matches == null || matches.length === 0) {
    return 0;
  }

  matches.sort((a, b) => a - b);
  return matches[0];
}

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
      required: false,
      default: "",
      trim: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    salaryValue: {
      type: Number,
      default: 0,
      index: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

JobModel.pre("save", function syncSalaryValue() {
  this.salaryValue = parseSalaryValue(this.salary);
});

function syncSalaryValueOnUpdate() {
  const update = this.getUpdate() || {};
  const salary = update.salary ?? update.$set?.salary;
  if (salary != null) {
    const salaryValue = parseSalaryValue(salary);
    if (update.$set) {
      update.$set.salaryValue = salaryValue;
    } else {
      update.salaryValue = salaryValue;
    }
  }
  this.setUpdate(update);
}

JobModel.pre("findOneAndUpdate", syncSalaryValueOnUpdate);
JobModel.pre("updateOne", syncSalaryValueOnUpdate);
JobModel.pre("updateMany", syncSalaryValueOnUpdate);

export default mongoose.model("Job", JobModel);
