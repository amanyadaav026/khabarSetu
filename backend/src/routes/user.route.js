import express from "express";
import {
  updateUser,
  deleteUser,
  saveArticle,
  unsaveArticle,
  getSavedArticles,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);

router.post("/save/:articleId", verifyUser, saveArticle);
router.delete("/unsave/:articleId", verifyUser, unsaveArticle);
router.get("/saved", verifyUser, getSavedArticles);

router.get(
  "/all-users",
  verifyUser,
  verifyAdmin,
  getAllUsers
);

export default router;