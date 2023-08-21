import bookmarkController from "../controllers/bookmarkController.js";
import AuthMiddleware from "../middleware/verifyToken.js";
import { Router } from "express";
const router = Router();

// CREATE BOOKMARKS
router.post("/", bookmarkController.createBookmark);

// DELETE BOOKMARKS

router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  bookmarkController.deleteBookmark
);

// GET BOOKMARKS
router.get("/:userId", bookmarkController.getBookmarks);

export default router;
