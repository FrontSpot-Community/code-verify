import express from 'express';
import {
    getAll, getById, getUser, removeUser, editUser
} from '../handlers/user.handler';

/**
 * @module Routes/User route
 */
const router = express.Router();

router.get('/me', getUser);
router.get('/user', getAll);
router.get('/user/:id', getById);
router.post('/user/:id', removeUser);
router.put('/user/:id', editUser);


export default router;
