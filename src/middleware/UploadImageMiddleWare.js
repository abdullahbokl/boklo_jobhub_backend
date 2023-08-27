import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

class UploadImageMiddleware {
  static configureCloudinary() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
      secure: true,
    });
  }

  static async uploadAndGetImageUrl(req, res, next) {
    UploadImageMiddleware.configureCloudinary();

    const imageFile = req.file;
    try {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "uploads",
      });
      req.file.imageUrl = result.secure_url;

      next();
    } catch (error) {
      console.log("UploadImageMiddleware", error);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteLocalImageAndReturnUrl(req, res, next) {
    const imageFile = req.file;

    try {
      fs.unlinkSync(imageFile.path);

      res.status(200).json(imageFile.imageUrl);
    } catch (error) {
      console.log("UploadImageMiddleware", error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default UploadImageMiddleware;
