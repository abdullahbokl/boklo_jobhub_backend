import app from "../app.js";
import db from "./db.js";

const port = process.env.PORT || 7000;
app
  .listen(port, async () => {
    await db();
  })
  .on("listening", () => {
    console.log(`Listening on port ${port}`);
  })
  .on("error", (error) => {
    console.error(error);
  });
