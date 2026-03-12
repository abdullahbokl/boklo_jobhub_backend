import ApplicationModel from "../../models/applicationModel.js";
import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError, ForbiddenError } from "../../utils/errors.js";

class GetJobApplicationsService {
  /**
   * GET /applications/job/:jobId — agent/admin only
   */
  static async getByJob(req, res, next) {
    try {
      const job = await JobModel.findById(req.params.jobId);
      if (!job) return next(new NotFoundError("Job not found"));

      // Agents can only see their own job's applications
      if (!req.user.isAdmin && job.agentId?.toString() !== req.user.id) {
        return next(new ForbiddenError("Access denied"));
      }

      const apps = await ApplicationModel.find({ jobId: req.params.jobId })
        .populate("applicantId", "fullName email userName profilePic location")
        .sort({ createdAt: -1 })
        .lean();

      const data = apps.map(({ _id, __v, ...rest }) => ({ id: _id, ...rest }));
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetJobApplicationsService;

