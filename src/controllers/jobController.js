import CreateJobService from "../services/jobs/createJobService.js";
import UpdateJobService from "../services/jobs/updateJobService.js";
import DeleteJobService from "../services/jobs/deleteJobService.js";
import GetJobService from "../services/jobs/getJobService.js";
import GetAllJobsService from "../services/jobs/getAllJobsService.js";
import SearchJobsService from "../services/jobs/searchJobsService.js";

class JobController {
  static async createJob(req, res) {
    await CreateJobService.createJob(req, res);
  }

  static async updateJob(req, res) {
    await UpdateJobService.updateJob(req, res);
  }

  static async deleteJob(req, res) {
    await DeleteJobService.deleteJob(req, res);
  }

  static async getJob(req, res) {
    await GetJobService.getJob(req, res);
  }

  static async getAllJobs(req, res) {
    await GetAllJobsService.getAllJobs(req, res);
  }

  static async searchJobs(req, res) {
    await SearchJobsService.searchJobs(req, res);
  }
}

export default JobController;
