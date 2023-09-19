import chatModel from "../../models/chatModel.js";
import messageModel from "../../models/messageModel.js";
import UserModel from "../../models/userModel.js";

async function sendMessage(req, res) {
  const senderId = req.user.id;
  const { content, receiverId, id: chatId } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  if (!chatId) {
    return res.status(400).json({ error: "Chat is required" });
  }

  try {
    const newMessage = new messageModel({
      sender: senderId,
      content,
      receiver: receiverId,
      chat: chatId,
    });

    var message = await messageModel.create(newMessage);

    const chat = await chatModel.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    message = await message.populate("sender");
    // message = await message.populate("chat").execPopulate();
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "userName fullName profilePic",
    });

    message = _handleLatestMessage(message);

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

function _handleLatestMessage(latestMessage) {
  if (!latestMessage) {
    return latestMessage;
  }

  const { sender, _id, ...rest } = latestMessage._doc;
  rest.id = _id;
  rest.sender = _handleSender(sender);
  return rest;
}

function _handleSender(sender) {
  const { _id, ...rest } = sender._doc;
  rest.id = _id;
  return rest;
}

export default sendMessage;
