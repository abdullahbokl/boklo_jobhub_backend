import { Router } from "express";
import JobController from "../controllers/jobController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { validate } from "../validators/validate.js";
import { createJobSchema, updateJobSchema } from "../validators/jobValidator.js";
const router = Router();
router
  .route("/")
  .post(AuthMiddleware.verifyTokenAndAgent, validate(createJobSchema), JobController.createJob)
  .get(JobController.getAllJobs);
router.get("/my-applications", AuthMiddleware.verifyToken, JobController.getMyApplications);
router.get("/search/:query", JobController.searchJobs);
router
  .route("/:id")
  .get(JobController.getJob)
  .put(AuthMiddleware.verifyTokenAndAgent, validate(updateJobSchema), JobController.updateJob)
  .delete(AuthMiddleware.verifyTokenAndAgent, JobController.deleteJob);
router.post("/:id/apply", AuthMiddleware.verifyToken, JobController.applyForJob);
export default router;
