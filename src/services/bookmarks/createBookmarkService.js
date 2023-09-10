import UserModel from "../../models/userModel.js";

async function createBookmarkService(req, res) {
  try {
    const { jobId } = req.body;
    const user = await _findUserById(req.user.id);
    const isExist = _isJobBookmarked(user, jobId);

    if (isExist) {
      console.log("Job already bookmarked");
      return res.status(400).json({
        message: "Job already bookmarked",
      });
    }

    const updatedUser = await _addBookmarkToUser(req.user.id, jobId);

    const { bookmarks } = updatedUser;

    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _findUserById(userId) {
  const user = await UserModel.findById(userId);
  if (!user) {
    console.log("User not found");
    throw new Error("User not found");
  }
  return user;
}

function _isJobBookmarked(user, jobId) {
  let isExist = false;
  user.bookmarks.forEach((bookmark) => {
    if (bookmark.jobId.toString() === jobId) {
      isExist = true;
    }
  });
  return isExist;
}

async function _addBookmarkToUser(userId, jobId) {
  return await UserModel.findByIdAndUpdate(
    userId,
    { $push: { bookmarks: { jobId } } },
    { new: true }
  );
}

export default createBookmarkService;
