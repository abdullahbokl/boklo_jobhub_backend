import bookmarkController from "../controllers/bookmarkController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";
const router = Router();

router
  .route("/")
  .post(AuthMiddleware.verifyToken, bookmarkController.createBookmark)
  .delete(AuthMiddleware.verifyToken, bookmarkController.deleteBookmark)
  .get(AuthMiddleware.verifyToken, bookmarkController.getBookmarks);

export default router;
