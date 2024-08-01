import express from "express";
import { getAllUsers, loginUser, registerUser, uploadProfilePhoto } from "../controller/userController.js";
import tryCatch from "../middleware/tryCatch.js";
import { authenticateToken } from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", tryCatch(registerUser));
router.post("/login", tryCatch(loginUser));
router.get("/users", authenticateToken,tryCatch(getAllUsers));
router.post("/uploadphoto/:userId", upload.single("file"),tryCatch(uploadProfilePhoto))

export default router;
