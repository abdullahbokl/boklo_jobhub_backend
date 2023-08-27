import mongoose from "mongoose";

const ImageModel = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Image", ImageModel);
