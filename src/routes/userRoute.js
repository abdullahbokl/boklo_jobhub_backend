import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/users:
 * get:
 * description: Use to request all users
 * responses:
 * '200':
 * description: A successful response
 *
 * @swagger
 * /api/users/{id}:
 * get:
 * description: Use to request a user
 * responses:
 * '200':
 * description: A successful response
 *
 * @swagger
 * /api/users/{id}:
 * put:
 * description: Use to update a user
 * responses:
 * '200':
 * description: A successful response
 *
 * @swagger
 * /api/users/{id}:
 * delete:
 * description: Use to delete a user
 * responses:
 * '200':
 * description: A successful response
 *
 * */

router.route("/:id").get(UserController.getUser);

router
  .route("/")
  .get(UserController.getAllUsers)
  .put(AuthMiddleware.verifyToken, UserController.updateUser)
  .delete(AuthMiddleware.verifyToken, UserController.deleteUser);

export default router;
