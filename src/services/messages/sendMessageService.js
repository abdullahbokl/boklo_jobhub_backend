import MessageModel from "../../models/messageModel.js";
import chatModel from "../../models/chatModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError } from "../../utils/errors.js";
class SendMessageService {
  static async sendMessage(req, res, next) {
    try {
      const { chatId, content, receiverId } = req.body;
      const chat = await chatModel.findById(chatId);
      if (!chat) return next(new NotFoundError("Chat not found"));
      let message = await MessageModel.create({
        sender: req.user.id, content, chat: chatId, receiver: receiverId,
      });
      message = await message.populate("sender", "-password -refreshToken");
      message = await message.populate("chat");
      await chatModel.findByIdAndUpdate(chatId, { latestMessage: message._id });
      const { _id, __v, sender, ...rest } = message.toObject();
      const { _id: sId, __v: sv, password, ...senderRest } = sender;
      return ApiResponse.created(res, { id: _id, ...rest, sender: { id: sId, ...senderRest } });
    } catch (error) { next(error); }
  }
}
export default SendMessageService;
