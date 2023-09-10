import UserModel from "../../models/userModel.js";
import JobModel from "../../models/jobModel.js";

async function getBookmarksService(req, res) {
  const userID = req.user.id;

  try {
    const user = await findUserById(userID);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const bookmarkedJobs = await getBookmarkedJobs(user);

    return res.status(200).json(bookmarkedJobs);
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

async function getBookmarkedJobs(user) {
  const bookmarks = user.bookmarks;
  const bookmarkedJobs = [];

  for (let i = 0; i < bookmarks.length; i++) {
    const job = await findJobById(bookmarks[i].jobId);

    if (job) {
      const { _id, __v, ...rest } = job._doc;
      rest.id = _id;
      bookmarkedJobs.push(rest);
    }
  }

  return bookmarkedJobs;
}

async function findJobById(jobId) {
  const job = await JobModel.findById(jobId);
  return job;
}

export default getBookmarksService;
