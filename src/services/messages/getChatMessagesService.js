import messageModel from "../../models/messageModel.js";

async function getChatMessages(req, res) {
  const nnumberOfMessagesPerPage = 17;
  const pageNumber = Number(req.query.pageNumber) || 1;

  const skip = nnumberOfMessagesPerPage * (pageNumber - 1);

  const chatId = req.params.id;

  try {
    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(nnumberOfMessagesPerPage)
      .populate("sender", "userName fullName profilePic")
      .populate("chat")
      .populate("chat.users", "userName fullName profilePic");

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export default getChatMessages;
