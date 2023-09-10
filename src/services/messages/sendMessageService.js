import chatModel from "../../models/chatModel.js";
import messageModel from "../../models/messageModel.js";
import UserModel from "../../models/userModel.js";

async function sendMessage(req, res) {
  const senderId = req.user.id;
  const { content, receiverId, chatId } = req.body;

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

    message = await message.populate("sender", "userName fullName profilePic");
    // message = await message.populate("chat").execPopulate();
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "userName fullName profilePic",
    });

    const temp = await chatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    console.log(temp);

    // message = await message
    //   .populate({
    //     path: "chat.users",
    //     select: "userName fullName profilePic",
    //   });

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export default sendMessage;
