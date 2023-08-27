import BookMarkModel from "../../models/bookmarkModel.js";

class GetBookmarksService {
  static async getBookmarks(req, res) {
    const { userId } = req.params;

    try {
      const bookmarks = await BookMarkModel.find({ userId: userId });
      res.status(200).json(bookmarks);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default GetBookmarksService;
