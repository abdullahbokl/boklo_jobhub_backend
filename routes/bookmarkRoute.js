import bookmarkController from "../controllers/bookmarkController.js";
import AuthMiddleware from "../middleware/verifyToken.js";
import { Router } from "express";
const router = Router();

/**
 * @swagger
 * /api/bookmarks:
 * post:
 * description: Use to create a bookmark
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.post("/", bookmarkController.createBookmark);

/**
 * @swagger
 * /api/bookmarks/{id}:
 * delete:
 * description: Use to delete a bookmark
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  bookmarkController.deleteBookmark
);

/**
 * @swagger
 * /api/bookmarks/{userId}:
 * get:
 * description: Use to request all bookmarks
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.get("/:userId", bookmarkController.getBookmarks);

export default router;
