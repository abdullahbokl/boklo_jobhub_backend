import mongoose from "mongoose";

const BookmarkModel = new mongoose.schem(
  {
    job: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
  },
  { TimeStamps: true }
);

export default mongoose.model("Bookmark", BookmarkModel);
