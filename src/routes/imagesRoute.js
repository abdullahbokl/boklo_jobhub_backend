import MulterMiddleWare from "../middleware/MulterMiddleWare.js";
import UploadImageMiddleware from "../middleware/UploadImageMiddleWare.js";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  MulterMiddleWare.uploadFile,
  UploadImageMiddleware.uploadAndGetImageUrl,
  UploadImageMiddleware.deleteLocalImageAndReturnUrl
);

export default router;
