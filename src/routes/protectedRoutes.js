import express from 'express';
import { protectedRoute } from '../controllers/protectedController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, protectedRoute);

export default router;
