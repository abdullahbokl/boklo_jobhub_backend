import chatModel from "../../models/chatModel.js";
import UserModel from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
async function getAllChats(req, res, next) {
  try {
    let results = await chatModel
      .find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password -__v -refreshToken")
      .populate("groupAdmin", "-password -__v -refreshToken")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    results = await UserModel.populate(results, { path: "latestMessage.sender", select: "-password -refreshToken" });
    const data = results.map((chat) => {
      const obj = chat.toObject();
      const { _id, __v, users, latestMessage, ...rest } = obj;
      return {
        id: _id,
        ...rest,
        users: users.map(({ _id, __v, password, refreshToken, ...u }) => ({ id: _id, ...u })),
        latestMessage: latestMessage ? _sanitizeMessage(latestMessage) : null,
      };
    });
    return ApiResponse.success(res, data);
  } catch (error) { next(error); }
}
function _sanitizeMessage(msg) {
  const { _id, __v, sender, ...rest } = msg;
  const s = sender ? (() => { const { _id, __v, password, ...u } = sender; return { id: _id, ...u }; })() : null;
  return { id: _id, ...rest, sender: s };
}
export default getAllChats;
