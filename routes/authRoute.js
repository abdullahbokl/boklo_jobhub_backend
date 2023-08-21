import { Router } from "express";
import authController from "../controllers/authController.js"; // Use camelCase for file name

const router = Router();

// Registration
router.post("/register", authController.createUser);

// Login
router.post("/login", authController.loginUser);

export default router;
