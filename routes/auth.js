import express from 'express';
import { getLoginController, postLoginController, logoutController } from '../controllers/auth.js';
import { authMiddleware } from '../middlewares/auth.js';
const router = express.Router();

router.get('/login', authMiddleware, getLoginController);
router.post('/login', authMiddleware, postLoginController);
router.post('/logout', logoutController);

export default router;
