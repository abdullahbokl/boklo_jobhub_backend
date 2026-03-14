import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import {
  buildJobFilters,
  getSalaryRange,
  matchesSalaryRange,
  toJobResponse,
} from "../../utils/jobQuery.js";
class SearchJobsService {
  static async searchJobs(req, res, next) {
    try {
      const query = req.params.query;
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(50, parseInt(req.query.limit) || 10);
      const skip = (page - 1) * limit;
      const filter = buildJobFilters({ ...req.query, query });
      const salaryRange = getSalaryRange(req.query);

      if (!salaryRange) {
        const [jobs, total] = await Promise.all([
          JobModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
          JobModel.countDocuments(filter),
        ]);
        const data = jobs.map(toJobResponse);
        return ApiResponse.paginated(res, data, total, page, limit);
      }

      const jobs = await JobModel.find(filter).sort({ createdAt: -1 }).lean();
      const filteredJobs = jobs.filter((job) => matchesSalaryRange(job, salaryRange));
      const data = filteredJobs.slice(skip, skip + limit).map(toJobResponse);

      return ApiResponse.paginated(res, data, filteredJobs.length, page, limit);
    } catch (error) {
      next(error);
    }
  }
}
export default SearchJobsService;
