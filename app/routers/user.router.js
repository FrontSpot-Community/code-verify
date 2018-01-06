import express from 'express';
import {getAll, getById, getUser} from '../handlers/user.handler';

/**
 * @module Routes/User route
 */
const router = express.Router();

router.get('/me', getUser);
router.get('/user', getAll);
router.get('/user/:id', getById);


export default router;
