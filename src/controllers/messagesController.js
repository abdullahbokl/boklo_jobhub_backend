import SendMessageService from "../services/messages/sendMessageService.js";
import GetMessagesService from "../services/messages/getMessagesService.js";
class MessagesController {
  static sendMessage(req, res, next) { return SendMessageService.sendMessage(req, res, next); }
  static getMessages(req, res, next) { return GetMessagesService.getMessages(req, res, next); }
}
export default MessagesController;
