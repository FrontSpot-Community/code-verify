/**
 * @module Routes
 * @desc API endpoints for code-verify
 */

import express from 'express';
import authRouter from './auth.router';
import tournamentRouter from './tournament.router';
import taskRouter from './task.router';
import userRouter from './user.router';
import solutionRouter from './solution';
import runRouter from './run.router';
import secRouter from './sec.router';

const router = express.Router();

router.use(authRouter);
router.use(tournamentRouter);
router.use(taskRouter);
router.use(userRouter);
router.use(solutionRouter);
router.use(runRouter);
router.use(secRouter);

export default router;

