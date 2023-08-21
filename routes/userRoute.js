import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/verifyToken.js";
import { Router } from "express";

const router = Router();

// update user
router.put(
  "/:id",
  AuthMiddleware.verifyAndAuthorization,
  UserController.updateUser
);
// delete user
router.delete(
  "/:id",
  AuthMiddleware.verifyAndAuthorization,
  UserController.deleteUser
);

// get a user
router.get(
  "/:id",
  AuthMiddleware.verifyAndAuthorization,
  UserController.getUser
);

// get all users
router.get("/", AuthMiddleware.verifyTokenAndAdmin, UserController.getAllUsers);

export default router;
