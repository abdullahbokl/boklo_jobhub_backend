import CreateBookmarkService from "../services/bookmarks/createBookmarkService.js";
import DeleteBookmarkService from "../services/bookmarks/deleteBookmarkService.js";
import GetBookmarksService from "../services/bookmarks/getBookmarkService.js";
class BookmarkController {
  static async createBookmark(req, res) {
    await CreateBookmarkService.createBookmark(req, res);
  }

  static async deleteBookmark(req, res) {
    await DeleteBookmarkService.deleteBookmark(req, res);
  }

  static async getBookmarks(req, res) {
    await GetBookmarksService.getBookmarks(req, res);
  }
}

export default BookmarkController;
