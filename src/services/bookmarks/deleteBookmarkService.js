import BookMarkModel from "../../models/bookmarkModel.js";

class DeleteBookmarkService {
  async deleteBookmark(req, res) {
    const { id } = req.params;
    try {
      await BookMarkModel.findByIdAndDelete(id);
      res.status(200).json("Bookmark successfully deleted");
    } catch (error) {
      console.error("Bookmark error:", error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default DeleteBookmarkService;
