import JobModel from "../models/jobModel.js";

class JobController {
  static async createJob(req, res) {
    const newJob = new JobModel(req.body);
    try {
      const savedJob = await newJob.save();
      console.log(savedJob);
      res.status(200).json(savedJob);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

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
      res.status(500).json(error);
    }
  }

  static async deleteJob(req, res) {
    try {
      await JobModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Job has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getJob(req, res) {
    try {
      const job = await JobModel.findById(req.params.id);

      res.status(200).json(job);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllJobs(req, res) {
    const query = req.query.new;
    try {
      const jobs = await JobModel.find();

      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async searchJobs(req, res) {
    const query = req.params.query;
    console.log(query);
    try {
      const result = await JobModel.aggregate([
        {
          $search: {
            index: "jobsearch",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      // const result = await JobModel.find({
      //   $or: [
      //     { title: { $regex: query, $options: "i" } },
      //     { description: { $regex: query, $options: "i" } },
      //   ],
      // });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default JobController;
