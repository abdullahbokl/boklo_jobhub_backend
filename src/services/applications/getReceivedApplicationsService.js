import ApplicationModel from "../../models/applicationModel.js";
import JobModel from "../../models/jobModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";

class GetReceivedApplicationsService {
  /**
   * GET /applications/received — applications received on current agent jobs.
   */
  static async getReceived(req, res, next) {
    try {
      let query = {};

      if (!req.user.isAdmin) {
        const myJobs = await JobModel.find({ agentId: req.user.id }).select("_id").lean();
        const myJobIds = myJobs.map((j) => j._id);

        if (!myJobIds.length) {
          return ApiResponse.success(res, []);
        }

        query = { jobId: { $in: myJobIds } };
      }

      const apps = await ApplicationModel.find(query)
        .populate("jobId", "title company location salary contract period imageUrl")
        .populate("applicantId", "fullName email userName profilePic location")
        .sort({ createdAt: -1 })
        .lean();

      const data = apps.map(({ _id, __v, ...rest }) => ({
        id: _id,
        ...rest,
      }));

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }
}

export default GetReceivedApplicationsService;

