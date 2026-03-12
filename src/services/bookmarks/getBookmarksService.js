import UserModel from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
class GetBookmarksService {
  static async getBookmarks(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id)
        .populate("bookmarks.jobId", "title company location salary imageUrl contract period")
        .lean();
      const bookmarks = (user?.bookmarks || []).map(({ _id, jobId, createdAt }) => ({
        id: _id,
        job: jobId,
        createdAt,
      }));
      return ApiResponse.success(res, bookmarks);
    } catch (error) { next(error); }
  }
}
export default GetBookmarksService;
