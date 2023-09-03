import { Router } from "express";
import authController from "../controllers/authController.js";
import InputValidationMiddleware from "../middleware/inputValidationMiddleware.js";

const router = Router();

router.post(
  "/register",
  InputValidationMiddleware.validateRegisterInput,
  authController.createUser
);

router.post(
  "/login",
  InputValidationMiddleware.validateLoginInput,
  authController.loginUser
);

export default router;
