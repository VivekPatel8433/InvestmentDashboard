import express from "express";
import { registerUserController, loginUserController } from "../controllers/authController.js"
import { refreshController } from "../controllers/refreshController.js";

const router = express.Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post("/refresh", refreshController);


export default router;