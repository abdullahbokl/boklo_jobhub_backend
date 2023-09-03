import JobModel from "../../models/jobModel.js";
import UserModel from "../../models/userModel.js";

class CreateBookmarkService {
  static async createBookmark(req, res) {
    const { jobId } = req.body;
    try {
      const job = await JobModel.findById(jobId);
      if (!job) {
        console.log("Job not found");
        res.status(404).json({
          message: "Job not found",
        });
      }

      const user = await UserModel.findById(req.user.id);

      for (let i = 0; i < user.bookmarks.length; i++) {
        if (user.bookmarks[i] === jobId) {
          console.log("Job already bookmarked");
          res.status(400).json({
            message: "Job already bookmarked",
          });
        }
      }

      const newUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        { $push: { bookmarks: { job: jobId } } },
        { new: true }
      );

      const { bookmarks } = newUser;

      res.status(200).json({ bookmarks });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default CreateBookmarkService;
