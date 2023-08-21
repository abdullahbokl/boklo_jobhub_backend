import mongoose from "mongoose";

async function startServer(app) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");

    const port = process.env.PORT || 7000;
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export default startServer;
