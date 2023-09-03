import JobModel from "../../models/jobModel.js";

class DeleteJobService {
  static async deleteJob(req, res) {
    try {
      await JobModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Job has been deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default DeleteJobService;
