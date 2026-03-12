import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
class SearchJobsService {
  static async searchJobs(req, res, next) {
    try {
      const query = req.params.query;
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(50, parseInt(req.query.limit) || 10);
      const skip = (page - 1) * limit;
      const filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { company: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      };
      const [jobs, total] = await Promise.all([
        JobModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        JobModel.countDocuments(filter),
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
export default SearchJobsService;
