import { Router } from "express";
import MessagesController from "../controllers/messagesController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
router.use(AuthMiddleware.verifyToken);
router.post("/", MessagesController.sendMessage);
router.get("/:chatId", MessagesController.getMessages);
export default router;
