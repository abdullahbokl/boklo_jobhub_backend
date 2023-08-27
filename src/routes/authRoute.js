import { Router } from "express";
import authController from "../controllers/authController.js";
import InputValidationMiddleware from "../middleware/InputValidationMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/register:
 * post:
 * summary: Register a new user
 * description: Register a new user
 * requestBody:
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * userName:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * required:
 * - userName
 * - email
 * - password
 * responses:
 * 201:
 * description: User created successfully
 * 409:
 * description: User already exists
 * 500:
 * description: Internal server error
 * */

router.post(
  "/register",
  InputValidationMiddleware.validateRegisterInput,
  authController.createUser
);

/**
 * @swagger
 * /api/login:
 * post:
 * summary: Login a user
 * description: Login a user
 * requestBody:
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * userName:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * required:
 * - email
 * - password
 * responses:
 * 200:
 * description: User logged in successfully
 * 401:
 * description: Invalid email or password
 * 500:
 * description: Internal server error
 * */
router.post(
  "/login",
  InputValidationMiddleware.validateLoginInput,
  authController.loginUser
);

export default router;
