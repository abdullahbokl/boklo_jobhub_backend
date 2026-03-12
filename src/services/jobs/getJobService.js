import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError } from "../../utils/errors.js";
class GetJobService {
  static async getJob(req, res, next) {
    try {
      const job = await JobModel.findById(req.params.id).lean();
      if (!job) return next(new NotFoundError("Job not found"));
      const { _id, __v, agentId, ...rest } = job;
      return ApiResponse.success(res, { id: _id, agentId: agentId?.toString(), ...rest });
    } catch (error) {
      next(error);
    }
  }
}
export default GetJobService;
