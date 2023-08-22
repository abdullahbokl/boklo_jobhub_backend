import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { Router } from "express";
import InputValidationMiddleware from "../middleware/InputValidationMiddleware.js";

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

router
  .route("/:id")
  .get(UserController.getUser)
  .put(
    AuthMiddleware.verifyAndAuthorization,
    InputValidationMiddleware.validateRegisterInput,
    UserController.updateUser
  )
  .delete(AuthMiddleware.verifyAndAuthorization, UserController.deleteUser);

router.route("/").get(UserController.getAllUsers);

export default router;
