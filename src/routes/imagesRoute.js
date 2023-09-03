import MulterMiddleWare from "../middleware/multerMiddleWare.js";
import UploadImageMiddleware from "../middleware/uploadImageMiddleWare.js";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  MulterMiddleWare.uploadFile,
  UploadImageMiddleware.uploadAndGetImageUrl,
  UploadImageMiddleware.deleteLocalImageAndReturnUrl
);

export default router;
