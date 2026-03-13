import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";

class GetMyJobsService {
  static async getMyJobs(req, res, next) {
    try {
      const agentId = req.user.id;
      const jobs = await JobModel.find({ agentId }).sort({ createdAt: -1 }).lean();
      
      const data = jobs.map(({ _id, __v, agentId, ...rest }) => ({
        id: _id,
        agentId: agentId?.toString(),
        ...rest,
      }));

      return ApiResponse.success(res, data, "Jobs retrieved successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default GetMyJobsService;
