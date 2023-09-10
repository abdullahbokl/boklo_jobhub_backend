import JobModel from "../../models/jobModel.js";

class SearchJobsService {
  static async searchJobs(req, res) {
    const searchWord = req.params.query;
    try {
      await JobModel.createIndexes([
        {
          key: {
            title: "text",
            description: "text",
          },
          name: "jobsearch",
        },
      ]);

      const result = await JobModel.aggregate([
        {
          $search: {
            index: "jobsearch",
            text: {
              query: searchWord,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      const foundJobs = result.map((job) => {
        const { _id, __v, agentId, ...rest } = job;
        return {
          id: job._id,
          agentId: job.agentId._id,
          ...rest,
        };
      });

      console.log(foundJobs);
      res.status(200).json(foundJobs);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default SearchJobsService;
