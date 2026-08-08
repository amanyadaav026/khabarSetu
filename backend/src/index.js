import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Database connection failed");
    console.log(err);
  });