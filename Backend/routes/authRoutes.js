import express from "express";
import { loginController, registerController, refreshController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);

export default router;
