import UserModel from "../../models/userModel.js";

class GetBookmarksService {
  static async getBookmarks(req, res) {
    const userID = req.user.id;

    try {
      const user = await UserModel.findById(userID);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const bookmarks = await user.bookmarks;

      return res.status(200).json(bookmarks);
    } catch (error) {
      console.error("Bookmark error:", error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default GetBookmarksService;
