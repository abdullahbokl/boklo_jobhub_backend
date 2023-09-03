import JobModel from "../../models/jobModel.js";

class GetAllJobsService {
  static async getAllJobs(req, res) {
    try {
      const jobs = await JobModel.find();

      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default GetAllJobsService;
