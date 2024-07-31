import express from 'express';
import { getChatHistory, sendmessage } from '../controller/chatController.js';
import tryCatch from "../middleware/tryCatch.js";

const router = express.Router();


router.post('/send', tryCatch(sendmessage));

router.get('/history/:userId', tryCatch(getChatHistory));

export default router;
