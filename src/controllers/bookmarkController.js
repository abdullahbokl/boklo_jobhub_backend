import AddBookmarkService from "../services/bookmarks/addBookmarkService.js";
import RemoveBookmarkService from "../services/bookmarks/removeBookmarkService.js";
import GetBookmarksService from "../services/bookmarks/getBookmarksService.js";
class BookmarkController {
  static addBookmark(req, res, next) { return AddBookmarkService.addBookmark(req, res, next); }
  static removeBookmark(req, res, next) { return RemoveBookmarkService.removeBookmark(req, res, next); }
  static getBookmarks(req, res, next) { return GetBookmarksService.getBookmarks(req, res, next); }
}
export default BookmarkController;
