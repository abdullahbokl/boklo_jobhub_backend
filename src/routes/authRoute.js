import { Router } from "express";
import authController from "../controllers/authController.js";
import InputValidationMiddleware from "../middleware/InputValidationMiddleware.js";

const router = Router();

// Registration
router.post(
  "/register",
  InputValidationMiddleware.validateRegisterInput,
  authController.createUser
);

// Login
router.post(
  "/login",
  InputValidationMiddleware.validateLoginInput,
  authController.loginUser
);

export default router;
