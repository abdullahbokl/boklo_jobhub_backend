import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { toJobResponse } from "../../utils/jobQuery.js";

class GetMyJobsService {
  static async getMyJobs(req, res, next) {
    try {
      const agentId = req.user.id;
      const filter = { agentId };
      if (req.query.includeArchived !== "true") {
        // Backward compatibility: older jobs may not have isArchived persisted.
        filter.isArchived = { $ne: true };
      }
      const jobs = await JobModel.find(filter).sort({ createdAt: -1 }).lean();

      const data = jobs.map(toJobResponse);

      return ApiResponse.success(res, data, "Jobs retrieved successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default GetMyJobsService;
