import JobModel from "../../models/jobModel.js";

class CreateJobService {
  static async createJob(req, res) {
    const newJob = new JobModel(req.body);
    try {
      const savedJob = await newJob.save();
      savedJob.id = savedJob._id;
      res.status(200).json(savedJob);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default CreateJobService;
