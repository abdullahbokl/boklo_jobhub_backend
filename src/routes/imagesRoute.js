import MulterMiddleWare from "../middleware/multerMiddleWare.js";
import UploadImageMiddleware from "../middleware/uploadImageMiddleWare.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/images:
 * post:
 * description: Use to upload an image
 * responses:
 * '200':
 * description: return image url
 **/

router.post(
  "/",
  MulterMiddleWare.uploadFile,
  UploadImageMiddleware.uploadAndGetImageUrl,
  UploadImageMiddleware.deleteLocalImageAndReturnUrl
);

export default router;
