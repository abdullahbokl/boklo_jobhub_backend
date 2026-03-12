import { Router } from "express";
import BookmarkController from "../controllers/bookmarkController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
router.use(AuthMiddleware.verifyToken);
router.get("/", BookmarkController.getBookmarks);
router.post("/", BookmarkController.addBookmark);
router.delete("/:jobId", BookmarkController.removeBookmark);
export default router;
