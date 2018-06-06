import express from 'express';
import {getAll, getById, add, update} from '../handlers/task.handler';
import checkAccess from '../middlewares/checkAccess';

/**
 * @module Routes/Task route
 */
const router = express.Router();

router.get('/task', getAll);
router.get('/task/:id', getById);
router.post('/task', checkAccess, add);
router.put('/task/:id', checkAccess, update);


export default router;
