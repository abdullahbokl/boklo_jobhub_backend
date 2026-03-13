import { Router } from "express";
import ApplicationController from "../controllers/applicationController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { validate } from "../validators/validate.js";
import { updateStatusSchema } from "../validators/applicationValidator.js";

/**
 * @openapi
 * tags:
 *   name: Applications
 *   description: Job application management
 */

const router = Router();

/**
 * @openapi
 * /applications/job/{jobId}:
 *   get:
 *     tags: [Applications]
 *     summary: Get all applications for a job (agent/admin only)
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applications
 */
router.get("/job/:jobId", AuthMiddleware.verifyTokenAndAgent, ApplicationController.getByJob);

/**
 * @openapi
 * /applications/mine:
 *   get:
 *     tags: [Applications]
 *     summary: Get current user's applications
 *     responses:
 *       200:
 *         description: List of user applications
 */
router.get("/mine", AuthMiddleware.verifyToken, ApplicationController.getMyApplications);

/**
 * @openapi
 * /applications/received:
 *   get:
 *     tags: [Applications]
 *     summary: Get applications received on current agent's jobs
 *     responses:
 *       200:
 *         description: List of received applications
 */
router.get("/received", AuthMiddleware.verifyTokenAndAgent, ApplicationController.getReceived);

/**
 * @openapi
 * /applications/{id}:
 *   post:
 *     tags: [Applications]
 *     summary: Apply for a job
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Application submitted
 */
router.post("/:id", AuthMiddleware.verifyToken, ApplicationController.apply);

/**
 * @openapi
 * /applications/{id}/status:
 *   patch:
 *     tags: [Applications]
 *     summary: Update application status (agent/admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, reviewed, accepted, rejected]
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch(
  "/:id/status",
  AuthMiddleware.verifyTokenAndAgent,
  validate(updateStatusSchema),
  ApplicationController.updateStatus
);

export default router;

