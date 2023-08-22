import JobController from "../controllers/JobController.js";
import AuthMiddleware from "../middleware/verifyToken.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/jobs:
 * post:
 * description: Use to create a job
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.post("/", AuthMiddleware.verifyTokenAndAdmin, JobController.createJob);

/**
 * @swagger
 * /api/jobs/{id}:
 * get:
 * description: Use to request a job
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.put("/:id", AuthMiddleware.verifyTokenAndAdmin, JobController.updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 * delete:
 * description: Use to delete a job
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.delete(
  "/:id",
  AuthMiddleware.verifyTokenAndAdmin,
  JobController.deleteJob
);

/**
 * @swagger
 * /api/jobs/{id}:
 * get:
 * description: Use to request a job
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.get("/:id", JobController.getJob);

/**
 * @swagger
 * /api/jobs:
 * get:
 * description: Use to request all jobs
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.get("/", JobController.getAllJobs);

/**
 * @swagger
 * /api/jobs/search/{query}:
 * get:
 * description: Use to search for jobs
 * responses:
 * '200':
 * description: A successful response
 *
 **/

router.get("/search/:query", JobController.searchJobs);

export default router;
