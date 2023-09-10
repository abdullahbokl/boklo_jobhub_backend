import AuthMiddleware from "../middleware/authMiddleware.js";
import MessagesController from "../controllers/messagesController.js";
import { Router } from "express";

const router = Router();

// id = chat id
router.get(
  "/:id",
  AuthMiddleware.verifyToken,
  MessagesController.getChatMessages
);

router.post("/", AuthMiddleware.verifyToken, MessagesController.sendMessage);

export default router;
