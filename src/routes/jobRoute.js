import JobController from "../controllers/JobController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

router
  .route("/")
  .post(AuthMiddleware.verifyToken, JobController.createJob)
  .get(JobController.getAllJobs);

router
  .route("/:id")
  .get(JobController.getJob)
  .put(AuthMiddleware.verifyToken, JobController.updateJob)
  .delete(AuthMiddleware.verifyToken, JobController.deleteJob);

router.get("/search/:query", JobController.searchJobs);

export default router;
