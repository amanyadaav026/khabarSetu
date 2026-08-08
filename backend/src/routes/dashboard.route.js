import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", verifyUser, getDashboardStats);

export default router;