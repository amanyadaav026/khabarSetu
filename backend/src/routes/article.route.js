import express from "express";
import {
  createArticle,
  getUserArticles,
  deleteArticle,
  getArticle,
  updateArticle,
  getAllArticles,
  getSingleArticle,
  searchArticles,
  approveArticle,
  rejectArticle,
  getPendingArticles,
} from "../controllers/article.controller.js";

import { verifyUser } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/create", verifyUser, createArticle);
router.get("/my-articles", verifyUser, getUserArticles);
router.get("/", getAllArticles);

router.get("/search", searchArticles);



router.delete("/delete/:articleId", verifyUser, deleteArticle);
router.get("/my-article/:articleId", verifyUser, getArticle);

router.put("/update/:articleId", verifyUser, updateArticle);

router.get(
  "/pending",
  verifyUser,
  verifyAdmin,
  getPendingArticles
);

router.put(
  "/approve/:articleId",
  verifyUser,
  verifyAdmin,
  approveArticle
);

router.put(
  "/reject/:articleId",
  verifyUser,
  verifyAdmin,
  rejectArticle
);

router.get("/:articleId", getSingleArticle);


export default router;