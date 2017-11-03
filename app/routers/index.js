import express from 'express';
import authRouer from './auth.router';

const router = express.Router();
router.use(authRouer);

export default router;

