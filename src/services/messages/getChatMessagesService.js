import messageModel from "../../models/messageModel.js";

async function getChatMessages(req, res) {
  const nnumberOfMessagesPerPage = 17;
  const pageNumber = Number(req.query.pageNumber) || 1;

  const skip = nnumberOfMessagesPerPage * (pageNumber - 1);

  const chatId = req.params.id;

  console.log(chatId);

  try {
    let messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(nnumberOfMessagesPerPage)
      .populate("sender")
      .populate("chat")
      .populate("chat.users");

    messages = messages.map((message) => {
      const newMessage = _handleMessage(message);
      return newMessage;
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

function _handleMessage(message) {
  if (!message) {
    return message;
  }

  const { sender, _id, ...rest } = message._doc;
  rest.id = _id;
  rest.sender = _handleUser(sender);

  return rest;
}

function _handleUser(user) {
  const { _id, ...rest } = user._doc;
  rest.id = _id;
  return rest;
}

export default getChatMessages;
