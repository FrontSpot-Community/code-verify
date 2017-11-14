import express from 'express';
import {getAll, getById} from '../handlers/user.handler';

/**
 * @module Routes/User route
 */
const router = express.Router();

router.get('/user', getAll);
router.get('/user/:id', getById);


export default router;
