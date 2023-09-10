import JobModel from "../../models/jobModel.js";

class GetAllJobsService {
  static async getAllJobs(req, res) {
    try {
      const jobs = await JobModel.find();

      const newJobs = jobs.map((job) => {
        const { _id, __v, agentId, ...rest } = job._doc;
        return {
          id: job._id,
          agentId: job.agentId._id,
          ...rest,
        };
      });

      res.status(200).json(newJobs);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default GetAllJobsService;
