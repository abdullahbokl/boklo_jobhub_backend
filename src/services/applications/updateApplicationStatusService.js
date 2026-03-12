import ApplicationModel from "../../models/applicationModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError } from "../../utils/errors.js";

class UpdateApplicationStatusService {
  /**
   * PATCH /applications/:id/status — agent/admin only
   */
  static async updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      const application = await ApplicationModel.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).lean();

      if (!application) return next(new NotFoundError("Application not found"));
      const { _id, __v, ...rest } = application;
      return ApiResponse.success(res, { id: _id, ...rest }, "Application status updated");
    } catch (error) {
      next(error);
    }
  }
}

export default UpdateApplicationStatusService;

