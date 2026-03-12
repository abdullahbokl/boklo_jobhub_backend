import chatModel from "../../models/chatModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
async function accessChat(req, res, next) {
  try {
    const { userId } = req.body;
    let chat = await chatModel
      .findOne({ isGroupChat: false, users: { $all: [req.user.id, userId] } })
      .populate("users", "-password -__v -refreshToken")
      .populate("latestMessage");
    if (!chat) {
      chat = await chatModel.create({
        chatName: "direct",
        isGroupChat: false,
        users: [req.user.id, userId],
      });
      chat = await chatModel.findById(chat._id).populate("users", "-password -__v -refreshToken");
    }
    return ApiResponse.success(res, _sanitizeChat(chat));
  } catch (error) { next(error); }
}
function _sanitizeChat(chat) {
  const obj = chat.toObject ? chat.toObject() : chat;
  const { _id, __v, users, ...rest } = obj;
  return {
    id: _id,
    ...rest,
    users: users.map(({ _id, __v, password, refreshToken, ...u }) => ({ id: _id, ...u })),
  };
}
export default accessChat;
