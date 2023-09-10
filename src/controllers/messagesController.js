import getChatMessages from "../services/messages/getChatMessagesService.js";
import sendMessage from "../services/messages/sendMessageService.js";
class MessagesController {
  static async getChatMessages(req, res) {
    await getChatMessages(req, res);
  }

  static async sendMessage(req, res) {
    await sendMessage(req, res);
  }
}

export default MessagesController;
