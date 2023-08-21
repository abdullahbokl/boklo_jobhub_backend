import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/verifyToken.js";
import { Router } from "express";

const router = Router();

// Registration
router.put(
  "/:id",
  AuthMiddleware.verifyAndAuthorization,
  UserController.updateUser
);

export default router;
