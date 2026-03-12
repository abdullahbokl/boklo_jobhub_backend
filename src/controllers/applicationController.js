import ApplyJobService from "../services/applications/applyJobService.js";
import GetJobApplicationsService from "../services/applications/getJobApplicationsService.js";
import UpdateApplicationStatusService from "../services/applications/updateApplicationStatusService.js";

class ApplicationController {
  static apply = (req, res, next) => ApplyJobService.apply(req, res, next);
  static getMyApplications = (req, res, next) => ApplyJobService.getMyApplications(req, res, next);
  static getByJob = (req, res, next) => GetJobApplicationsService.getByJob(req, res, next);
  static updateStatus = (req, res, next) => UpdateApplicationStatusService.updateStatus(req, res, next);
}

export default ApplicationController;

