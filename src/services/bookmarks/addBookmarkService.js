import UserModel from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ConflictError, NotFoundError } from "../../utils/errors.js";
class AddBookmarkService {
  static async addBookmark(req, res, next) {
    try {
      const { jobId } = req.body;
      const user = await UserModel.findById(req.user.id);
      if (!user) return next(new NotFoundError("User not found"));
      const alreadyBookmarked = user.bookmarks.some((b) => b.jobId?.toString() === jobId);
      if (alreadyBookmarked) return next(new ConflictError("Job already bookmarked"));
      user.bookmarks.push({ jobId });
      await user.save();
      return ApiResponse.success(res, { bookmarks: user.bookmarks }, "Bookmark added");
    } catch (error) { next(error); }
  }
}
export default AddBookmarkService;
