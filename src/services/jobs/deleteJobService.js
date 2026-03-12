import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError, ForbiddenError } from "../../utils/errors.js";
class DeleteJobService {
  static async deleteJob(req, res, next) {
    try {
      const job = await JobModel.findById(req.params.id);
      if (!job) return next(new NotFoundError("Job not found"));
      if (job.agentId.toString() !== req.user.id && !req.user.isAdmin) {
        return next(new ForbiddenError("Not authorized to delete this job"));
      }
      await job.deleteOne();
      return ApiResponse.success(res, null, "Job deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
export default DeleteJobService;
