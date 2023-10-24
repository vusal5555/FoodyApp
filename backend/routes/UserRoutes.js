import express from "express";

const router = express.Router();
import { login, register, logOut } from "../controllers/UserController.js";

router.route("/").post(register);
router.route("/login").post(login);
router.route("/logout").post(logOut);

export default router;
