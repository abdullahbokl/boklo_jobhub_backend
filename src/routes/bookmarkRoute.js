import bookmarkController from "../controllers/bookmarkController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";
const router = Router();

router
  .route("/")
  .post(AuthMiddleware.verifyToken, bookmarkController.createBookmark)
  .get(AuthMiddleware.verifyToken, bookmarkController.getBookmarks);

router
  .route("/:jobId")
  .delete(AuthMiddleware.verifyToken, bookmarkController.deleteBookmark);

export default router;
