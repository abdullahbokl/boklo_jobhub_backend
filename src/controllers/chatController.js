import getAllChats from "../services/chats/getAllChatsService.js";
import accessChat from "../services/chats/accessChatService.js";
class ChatController {
  static getAllChats(req, res, next) { return getAllChats(req, res, next); }
  static accessChat(req, res, next) { return accessChat(req, res, next); }
}
export default ChatController;
