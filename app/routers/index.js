/**
 * @module Routes
 * @desc API endpoints for code-verify
 */

import express from 'express';
import authRouter from './auth.router';
import tournamentRouter from './tournament.router';

const router = express.Router();
router.use(authRouter);
router.use(tournamentRouter);

export default router;

