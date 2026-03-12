import UserModel from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError } from "../../utils/errors.js";
class RemoveBookmarkService {
  static async removeBookmark(req, res, next) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { $pull: { bookmarks: { jobId: req.params.jobId } } },
        { new: true }
      );
      if (!user) return next(new NotFoundError("User not found"));
      return ApiResponse.success(res, { bookmarks: user.bookmarks }, "Bookmark removed");
    } catch (error) { next(error); }
  }
}
export default RemoveBookmarkService;
