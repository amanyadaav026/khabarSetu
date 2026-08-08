import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  createComment,
  getArticleComments,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/get-comments", getComments);

router.get("/get/:articleId", getArticleComments);
router.delete(
  "/delete/:commentId",
  verifyUser,
  deleteComment
);

export default router;