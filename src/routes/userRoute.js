import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

router.route("/:id").get(UserController.getUser);

router
  .route("/")
  .get(UserController.getAllUsers)
  .put(AuthMiddleware.verifyToken, UserController.updateUser)
  .delete(AuthMiddleware.verifyToken, UserController.deleteUser);

export default router;
