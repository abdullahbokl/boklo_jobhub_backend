import ApplicationModel from "../../models/applicationModel.js";
import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError, ConflictError } from "../../utils/errors.js";
class ApplyJobService {
  static async apply(req, res, next) {
    try {
      const job = await JobModel.findById(req.params.id);
      if (!job) return next(new NotFoundError("Job not found"));
      const existing = await ApplicationModel.findOne({ jobId: req.params.id, applicantId: req.user.id });
      if (existing) return next(new ConflictError("You have already applied for this job"));
      const application = await new ApplicationModel({
        jobId: req.params.id,
        applicantId: req.user.id,
        coverLetter: req.body.coverLetter || "",
      }).save();
      return ApiResponse.created(res, { id: application._id, ...application.toObject() }, "Application submitted");
    } catch (error) {
      next(error);
    }
  }
  static async getMyApplications(req, res, next) {
    try {
      const apps = await ApplicationModel.find({ applicantId: req.user.id })
        .populate("jobId", "title company location salary imageUrl")
        .sort({ createdAt: -1 })
        .lean();
      const data = apps.map(({ _id, __v, ...rest }) => ({ id: _id, ...rest }));
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }
}
export default ApplyJobService;
