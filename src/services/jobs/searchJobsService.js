import JobModel from "../../models/jobModel.js";

class SearchJobsService {
  static async searchJobs(req, res) {
    const query = req.params.query;
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
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default SearchJobsService;
