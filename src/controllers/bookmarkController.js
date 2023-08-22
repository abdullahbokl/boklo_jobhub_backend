import BookMarkModel from "../models/bookmarkModel.js";

class BookmarkController {
  static async createBookmark(req, res) {
    const bookmark = new BookMarkModel(req.body);

    try {
      const savedBookmark = await bookmark.save();
      res.status(200).json(savedBookmark);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async deleteBookmark(req, res) {
    const { id } = req.params;
    try {
      await BookMarkModel.findByIdAndDelete(id);
      res.status(200).json("Bookmark successfully deleted");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async getBookmarks(req, res) {
    const { userId } = req.params;

    try {
      const bookmarks = await BookMarkModel.find({ userId: userId });
      res.status(200).json(bookmarks);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

export default BookmarkController;
