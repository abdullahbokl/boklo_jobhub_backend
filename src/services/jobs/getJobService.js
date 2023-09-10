import JobModel from "../../models/jobModel.js";

class GetJobService {
  static async getJob(req, res) {
    try {
      const job = await JobModel.findById(req.params.id);

      const { _id, __v, ...rest } = job._doc;
      rest.id = _id;
      res.status(200).json(rest);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default GetJobService;
