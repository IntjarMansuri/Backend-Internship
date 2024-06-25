import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  signupUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Import JWT verification middleware

const router = Router();

// Route for user signup
router.route("/signup").post(signupUser);

// Route for user login
router.route("/login").post(loginUser);

// Route for getting user profile, protected by JWT verification middleware
router.route("/profile").get(verifyJWT, getUserProfile);

export default router;
