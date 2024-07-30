import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";
import tryCatch from "../middleware/tryCatch.js";

const router = express.Router();

router.post("/register", tryCatch(registerUser));
router.post("/login", tryCatch(loginUser));

export default router;
