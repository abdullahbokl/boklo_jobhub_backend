// import ImageModel from "../models/imageModel.js";
// import UploadImageMiddleware from "../middleware/UploadImageMiddleWare.js";

// class ImageController {


//   static async uploadImage(req, res) {
//     const imageFile = req.file;

//     try {
//       await UploadImageMiddleware.deleteImageFromLocalFolder(req, res);

//       console.log('Image saved to database');
      
//       res.status(200).json(imageFile.imageUrl);
//     } catch (error) {
//       console.log('ImageController uploadImage', error);
//       res.status(500).json({ message: 'Error uploading image.' });
//     }
//   }


//   static async uploadImage(req, res) {
//     const imageFile = req.file;


//     UploadImageMiddleware.deleteImageFromLocalFolder(req, res);

//       console.log("Image saved to database");

//       res.status(200).json(imageFile.imageUrl);


//     const newImage = new ImageModel({
//       imageName: imageFile.originalname,
//       imageUrl: imageFile.imageUrl,
//     });

//     try {
//       await newImage.save();

//       // remove the image from local folder
//       UploadImageMiddleware.deleteImageFromLocalFolder(req, res);

//       console.log("Image saved to database");

//       res.status(200).json(imageFile.imageUrl);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         message: error,
//       });
//     }
//   }
// }

// export default ImageController;
