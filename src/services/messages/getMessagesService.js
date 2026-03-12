import MessageModel from "../../models/messageModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
class GetMessagesService {
  static async getMessages(req, res, next) {
    try {
      const messages = await MessageModel.find({ chat: req.params.chatId })
        .populate("sender", "-password -refreshToken")
        .sort({ createdAt: 1 })
        .lean();
      const data = messages.map(({ _id, __v, sender, ...rest }) => ({
        id: _id, ...rest,
        sender: sender ? (() => { const { _id: sId, __v: sv, ...s } = sender; return { id: sId, ...s }; })() : null,
      }));
      return ApiResponse.success(res, data);
    } catch (error) { next(error); }
  }
}
export default GetMessagesService;
