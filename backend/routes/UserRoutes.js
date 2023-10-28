import express from "express";

const router = express.Router();
import {
  login,
  register,
  logOut,
  getUserProfile,
  updateUserProfile,
} from "../controllers/UserController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(register);
router.route("/login").post(login);
router.route("/logout").post(protect, logOut);
router.route("/profile").get(protect, getUserProfile);
router.route("/edit").put(protect, updateUserProfile);

export default router;
