import JobModel from "../../models/jobModel.js";

class UpdateJobService {
  static async updateJob(req, res) {
    try {
      const updatedJob = await JobModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedJob);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default UpdateJobService;
