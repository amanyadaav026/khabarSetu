import express from "express";
import { signupUser, signinUser, google, signOut} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/google", google);
router.post("/signout", signOut);

export default router;