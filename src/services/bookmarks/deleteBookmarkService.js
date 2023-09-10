import UserModel from "../../models/userModel.js";

async function deleteBookmarkService(req, res) {
  const { jobId } = req.params;
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const bookmark = findBookmark(user, jobId);

    if (!bookmark) {
      console.log("Bookmark not found");
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    await removeBookmark(user, bookmark);

    return res.status(200).json("Bookmark deleted successfully");
  } catch (error) {
    console.error("Bookmark error:", error);
    res.status(500).json({
      message: error,
    });
  }
}

async function findUserById(userId) {
  const user = await UserModel.findById(userId);
  return user;
}

function findBookmark(user, jobId) {
  return user.bookmarks.find((bookmark) => bookmark.jobId == jobId);
}

async function removeBookmark(user, bookmark) {
  await user.bookmarks.remove(bookmark);
  await user.save();
}

export default deleteBookmarkService;
