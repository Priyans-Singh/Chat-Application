import express from "express";
import authenticate from "../authenticate.js";
import { getUserController } from "../controllers/getUserController.js";

const router = express.Router();

router.get("/",authenticate, getUserController);

export default router;