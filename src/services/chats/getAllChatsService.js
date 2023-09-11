import chatModel from "../../models/chatModel.js";
import UserModel from "../../models/userModel.js";

async function getAllChats(req, res) {
  try {
    let results = await chatModel
      .find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password -__v")
      .populate("groupAdmin", "-password -__v")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    results = await UserModel.populate(results, {
      path: "latestMessage.sender",
    });

    results = results.map((chat) => {
      const newUsers = chat.users.map((user) => {
        const { _id, ...rest } = user._doc;
        rest.id = _id;
        return rest;
      });

      const { _id, users, ...rest } = chat._doc;
      rest.id = _id;
      rest.users = newUsers;
      rest.latestMessage = _handleLatestMessage(rest.latestMessage);

      return rest;
    });

    res.status(200).json(results);
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

export default getAllChats;
