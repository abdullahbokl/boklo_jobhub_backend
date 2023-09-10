import getAllChats from "../services/chats/getAllChatsService.js";
import accessChat from "../services/chats/accessChatService.js";

class ChatController {
  static async getAllChats(req, res) {
    await getAllChats(req, res);
  }
  static async accessChat(req, res) {
    await accessChat(req, res);
  }
}

export default ChatController;
