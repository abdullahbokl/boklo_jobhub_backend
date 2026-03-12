import { Router } from "express";
import ChatController from "../controllers/chatController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
router.use(AuthMiddleware.verifyToken);
router.get("/", ChatController.getAllChats);
router.post("/", ChatController.accessChat);
export default router;
