import chatModel from "../../models/chatModel.js";
import UserModel from "../../models/userModel.js";

async function accessChat(req, res) {
  const { receiverId } = req.body;

  const isChat = await chatModel
    .findOne({
      users: { $all: [req.user.id, receiverId] },
    })
    .populate("users", "-password -__v")
    .populate("groupAdmin", "-password -__v")
    .populate("latestMessage");

  if (!isChat || !isChat.users) {
    const receiverName = await UserModel.findById(receiverId)
      .select("userName")
      .then((user) => user.userName);

    const newChat = new chatModel({
      chatName: receiverName,
      isGroupChat: false,
      users: [req.user.id, receiverId],
    });

    try {
      const createdChat = await chatModel.create(newChat);

      const fullChat = await chatModel
        .findOne({
          _id: createdChat._id,
        })

        .populate("users", "-password -__v")
        .populate("groupAdmin", "-password -__v")
        .populate("latestMessage");

      const newUsers = fullChat.users.map((user) => {
        const { _id, ...rest } = user._doc;
        rest.id = _id;
        return rest;
      });

      const { _id, users, ...rest } = fullChat._doc;
      rest.id = _id;
      rest.users = newUsers;

      res.status(201).json(rest);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to create chat" });
    }
  } else {
    const { _id, users, latestMessage, ...rest } = isChat._doc;
    rest.id = _id;
    rest.users = users.map((user) => _handleUser(user));

    rest.latestMessage = await _handleLatestMessage(rest.latestMessage);

    res.status(200).json(rest);
  }
}

async function _handleLatestMessage(latestMessage) {
  if (!latestMessage) {
    return latestMessage;
  }

  const { _id, ...rest } = latestMessage._doc;
  rest.id = _id;
  // populating sender
  rest.sender = await UserModel.populate(rest.sender);

  return rest;
}

function _handleUser(user) {
  const { _id, ...rest } = user._doc;
  rest.id = _id;
  return rest;
}

export default accessChat;
