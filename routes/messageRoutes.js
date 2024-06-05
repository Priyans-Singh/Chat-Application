import express from "express";
import { sendMessage,getMessage } from "../controllers/messageController.js";
import authenticate from "../authenticate.js"

const router = express.Router();

router.post("/send/:id", authenticate, sendMessage);
router.get("/get/:id", authenticate, getMessage);

export default router;