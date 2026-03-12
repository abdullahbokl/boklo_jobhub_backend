import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
class GetAllJobsService {
  static async getAllJobs(req, res, next) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(50, parseInt(req.query.limit) || 10);
      const skip = (page - 1) * limit;
      const [jobs, total] = await Promise.all([
        JobModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        JobModel.countDocuments(),
      ]);
      const data = jobs.map(({ _id, __v, agentId, ...rest }) => ({
        id: _id,
        agentId: agentId?.toString(),
        ...rest,
      }));
      return ApiResponse.paginated(res, data, total, page, limit);
    } catch (error) {
      next(error);
    }
  }
}
export default GetAllJobsService;
