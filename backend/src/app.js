import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import articleRouter from "./routes/article.route.js";
import commentRoute from "./routes/comment.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);
app.use("/api/comment", commentRoute);
app.use("/api/dashboard", dashboardRoute);

app.use(errorHandler);

export { app };

