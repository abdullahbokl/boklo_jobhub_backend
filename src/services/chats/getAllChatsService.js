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

    // populate the sender and the content of the latest message
    results = await UserModel.populate(results, {
      path: "latestMessage.sender",
      select: "userName fullName profilePic",
    });
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export default getAllChats;
