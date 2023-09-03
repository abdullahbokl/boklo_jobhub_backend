import UserModel from "../../models/userModel.js";

class DeleteBookmarkService {
  static async deleteBookmark(req, res) {
    const { jobId } = req.params;
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const bookmark = await user.bookmarks.find(
        (bookmark) => bookmark.jobId == jobId
      );
      if (!bookmark) {
        return res.status(404).json({
          message: "Bookmark not found",
        });
      }
      await user.bookmarks.remove(bookmark);
      await user.save();
      return res.status(200).json("Bookmark deleted successfully");
    } catch (error) {
      console.error("Bookmark error:", error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default DeleteBookmarkService;
