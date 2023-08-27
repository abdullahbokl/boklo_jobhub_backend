import multer from "multer";
import path from "path";

class MulterMiddleWare {
  static async uploadFile(req, res, next) {
    const storage = multer.diskStorage({
      destination: "uploads",
      filename: (req, file, cb) => {
        cb(
          null,
          `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
      },
    });

    // Create a Multer instance
    // remove this { Storage } if you don't want to save the file locally
    //      const upload = multer();
    const upload = multer({ storage });

    upload.single("uploads")(req, res, (error) => {
      if (error) {
        return res.status(400).json({ message: "File upload failed." });
      }
      req.file.path = `uploads/${req.file.filename}`;

      next();
    });
  }
}

export default MulterMiddleWare;
