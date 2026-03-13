import { Router } from "express";
import rateLimit from "express-rate-limit";
import AuthController from "../controllers/authController.js";
import { validate } from "../validators/validate.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "../validators/authValidator.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const isDev = process.env.NODE_ENV === "development";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many auth attempts, please try again later." },
  skip: () => isDev, // ⬅ no limit in dev
});

const router = Router();
router.post("/register", authLimiter, validate(registerSchema), AuthController.createUser);
router.post("/login", authLimiter, validate(loginSchema), AuthController.loginUser);
router.post("/refresh-token", authLimiter, validate(refreshTokenSchema), AuthController.refreshToken);
router.post("/logout", AuthMiddleware.verifyToken, AuthController.logout);
export default router;
