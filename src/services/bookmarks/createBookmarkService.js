import JobModel from "../../models/jobModel.js";
import BookMarkModel from "../../models/bookmarkModel.js";

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

      const bookmark = new BookMarkModel({
        userId: req.user.id,
        jobId: jobId,
      });

      const savedBookmark = await bookmark.save();

      const {
        password: omittedPassword,
        __v,
        updatedAt,
        ...newBookmark
      } = savedBookmark._doc;

      res.status(200).json(newBookmark);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}


export default CreateBookmarkService;