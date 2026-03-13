import chatModel from "../../models/chatModel.js";
import UserModel from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
async function accessChat(req, res, next) {
  try {
    const { userId, jobId } = req.body;
    const query = {
      isGroupChat: false,
      users: { $all: [req.user.id, userId] },
      jobId: jobId || null,
    };

    let chat = await chatModel
      .findOne(query)
      .populate("users", "-password -__v -refreshToken")
      .populate("latestMessage");
    if (!chat) {
      chat = await chatModel.create({
        chatName: "direct",
        isGroupChat: false,
        users: [req.user.id, userId],
        jobId: jobId || null,
      });
      chat = await chatModel.findById(chat._id).populate("users", "-password -__v -refreshToken");
    }

    chat = await UserModel.populate(chat, {
      path: "latestMessage.sender",
      select: "-password -refreshToken",
    });

    return ApiResponse.success(res, _sanitizeChat(chat));
  } catch (error) { next(error); }
}
function _sanitizeChat(chat) {
  const obj = chat.toObject ? chat.toObject() : chat;
  const { _id, __v, users, latestMessage, jobId, ...rest } = obj;
  return {
    id: _id,
    ...rest,
    jobId: jobId ? String(jobId) : null,
    users: users.map(({ _id, __v, password, refreshToken, ...u }) => ({ id: _id, ...u })),
    latestMessage: latestMessage ? _sanitizeMessage(latestMessage) : null,
  };
}

function _sanitizeMessage(msg) {
  const { _id, __v, sender, ...rest } = msg;
  const safeSender = sender
    ? (() => {
        const { _id, __v, password, refreshToken, ...u } = sender;
        return { id: _id, ...u };
      })()
    : null;
  return { id: _id, ...rest, sender: safeSender };
}

export default accessChat;
