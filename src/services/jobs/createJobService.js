import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { sanitizeDoc } from "../../utils/sanitize.js";
class CreateJobService {
  static async createJob(req, res, next) {
    try {
      const job = await new JobModel({ ...req.body, agentId: req.user.id }).save();
      return ApiResponse.created(res, sanitizeDoc(job), "Job created successfully");
    } catch (error) {
      next(error);
    }
  }
}
export default CreateJobService;
