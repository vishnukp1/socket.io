import express from 'express';
import { getChatHistory, sendmessage } from '../controller/chatController.js';
import tryCatch from "../middleware/tryCatch.js";
import { authenticateToken } from '../middleware/authUser.js';

const router = express.Router();


router.post('/send',authenticateToken, tryCatch(sendmessage));

router.get('/history/:userId',authenticateToken, tryCatch(getChatHistory));

export default router;
