import ApplicationModel from "../../models/applicationModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError } from "../../utils/errors.js";
import { normalizeApplicationStatus } from "../../utils/applicationStatus.js";

class UpdateApplicationStatusService {
  /**
   * PATCH /applications/:id/status — agent/admin only
   */
  static async updateStatus(req, res, next) {
    try {
      const status = normalizeApplicationStatus(req.body.status);
      const application = await ApplicationModel.findByIdAndUpdate(
        req.params.id,
        { $set: { status } },
        { new: true, runValidators: true }
      ).lean();

      if (!application) return next(new NotFoundError("Application not found"));
      const { _id, __v, ...rest } = application;
      return ApiResponse.success(
        res,
        { id: _id, status: normalizeApplicationStatus(application.status), ...rest },
        "Application status updated"
      );
    } catch (error) {
      next(error);
    }
  }
}

export default UpdateApplicationStatusService;
