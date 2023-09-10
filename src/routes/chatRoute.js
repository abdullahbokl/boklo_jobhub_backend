import AuthMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";
import ChatController from "../controllers/chatController.js";

const router = Router();

router.get("/", AuthMiddleware.verifyToken, ChatController.getAllChats);

router.post("/", AuthMiddleware.verifyToken, ChatController.accessChat);


export default router;
