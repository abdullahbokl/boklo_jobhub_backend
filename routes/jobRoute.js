import JobController from "../controllers/JobController.js";
import AuthMiddleware from "../middleware/verifyToken.js";
import { Router } from "express";

const router = Router();

// create job
router.post("/", AuthMiddleware.verifyTokenAndAdmin, JobController.createJob);

// update job
router.put("/:id", AuthMiddleware.verifyTokenAndAdmin, JobController.updateJob);

// delete job
router.delete(
  "/:id",
  AuthMiddleware.verifyTokenAndAdmin,
  JobController.deleteJob
);

// get a job
router.get("/:id", JobController.getJob);

// get all jobs
router.get("/", JobController.getAllJobs);

// search job
router.get("/search/:query", JobController.searchJobs);

export default router;
