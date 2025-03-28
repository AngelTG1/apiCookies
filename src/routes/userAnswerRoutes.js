import express from "express";
import {
  answerQuestion,
  getUserAnswers
} from "../controllers/userAnswerController.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/", authenticateToken, answerQuestion);

router.get("/:userId", authenticateToken, getUserAnswers);

export default router;
