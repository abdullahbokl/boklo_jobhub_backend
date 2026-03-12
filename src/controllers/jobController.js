import CreateJobService from "../services/jobs/createJobService.js";
import UpdateJobService from "../services/jobs/updateJobService.js";
import DeleteJobService from "../services/jobs/deleteJobService.js";
import GetJobService from "../services/jobs/getJobService.js";
import GetAllJobsService from "../services/jobs/getAllJobsService.js";
import SearchJobsService from "../services/jobs/searchJobsService.js";
import ApplyJobService from "../services/applications/applyJobService.js";
class JobController {
  static createJob(req, res, next) { return CreateJobService.createJob(req, res, next); }
  static updateJob(req, res, next) { return UpdateJobService.updateJob(req, res, next); }
  static deleteJob(req, res, next) { return DeleteJobService.deleteJob(req, res, next); }
  static getJob(req, res, next) { return GetJobService.getJob(req, res, next); }
  static getAllJobs(req, res, next) { return GetAllJobsService.getAllJobs(req, res, next); }
  static searchJobs(req, res, next) { return SearchJobsService.searchJobs(req, res, next); }
  static applyForJob(req, res, next) { return ApplyJobService.apply(req, res, next); }
  static getMyApplications(req, res, next) { return ApplyJobService.getMyApplications(req, res, next); }
}
export default JobController;
