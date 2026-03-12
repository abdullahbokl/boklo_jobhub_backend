import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError, ForbiddenError } from "../../utils/errors.js";
class UpdateJobService {
  static async updateJob(req, res, next) {
    try {
      const job = await JobModel.findById(req.params.id);
      if (!job) return next(new NotFoundError("Job not found"));
      if (job.agentId.toString() !== req.user.id && !req.user.isAdmin) {
        return next(new ForbiddenError("Not authorized to update this job"));
      }
      const updated = await JobModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).lean();
      const { _id, __v, agentId, ...rest } = updated;
      return ApiResponse.success(res, { id: _id, agentId: agentId?.toString(), ...rest }, "Job updated");
    } catch (error) {
      next(error);
    }
  }
}
export default UpdateJobService;
