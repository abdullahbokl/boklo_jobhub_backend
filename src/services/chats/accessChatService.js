import ChatModel from "../../models/chatModel.js";
import UserModel from "../../models/userModel.js";

async function accessChat(req, res) {
  const { receiverId } = req.body;

  var isChat = ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: receiverId } } },
    ],
  }).populate("users", "-password -__v");
  // .populate("groupAdmin", "-password -__v");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "userName fullName profilePic",
  });

  if (isChat.length > 0) {
    return res.status(200).json(isChat);
  } else {
    // select("userName").populate("users", ");
    const receiverName = await UserModel.findById(receiverId)
      .select("userName")
      .then((user) => user.userName);

    const newChat = new ChatModel({
      chatName: receiverName,
      isGroupChat: false,
      users: [req.user.id, receiverId],
    });

    try {
      const createdChat = await ChatModel.create(newChat);

      const fullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password -__v");

      res.status(201).json(fullChat);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to create chat" });
    }
  }
}

export default accessChat;
