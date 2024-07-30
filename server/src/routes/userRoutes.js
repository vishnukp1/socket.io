import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controller/userController.js";
import tryCatch from "../middleware/tryCatch.js";

const router = express.Router();

router.post("/register", tryCatch(registerUser));
router.post("/login", tryCatch(loginUser));
router.get("/users", tryCatch(getAllUsers));

export default router;
