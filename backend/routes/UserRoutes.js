import express from "express";

const router = express.Router();
import { login, register } from "../controllers/UserController.js";

router.route("/").post(register);
router.route("/login").post(login);

export default router;
