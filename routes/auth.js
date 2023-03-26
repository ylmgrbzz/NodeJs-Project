import express from 'express';
import { getLoginController, postRegisterController, getRegisterController, postLoginController, logoutController } from '../controllers/auth.js';
import { authMiddleware } from '../middlewares/auth.js';
import { registerValidation } from '../validations/register-validation.js';

const router = express.Router();

router.get('/login', authMiddleware, getLoginController);
router.post('/login', authMiddleware, postLoginController);
router.get('/register', authMiddleware, getRegisterController);
router.post('/register', authMiddleware, registerValidation, postRegisterController);
router.post('/logout', logoutController);

export default router;
