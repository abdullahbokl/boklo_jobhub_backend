import createBookmarkService from "../services/bookmarks/createBookmarkService.js";
import deleteBookmarkService from "../services/bookmarks/deleteBookmarkService.js";
import getBookmarksService from "../services/bookmarks/getBookmarkService.js";
class BookmarkController {
  static async createBookmark(req, res) {
    await createBookmarkService(req, res);
  }

  static async deleteBookmark(req, res) {
    await deleteBookmarkService(req, res);
  }

  static async getBookmarks(req, res) {
    await getBookmarksService(req, res);
  }
}

export default BookmarkController;
