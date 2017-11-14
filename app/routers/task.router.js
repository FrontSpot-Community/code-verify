import express from 'express';
import {getAll, getById, add, update} from '../handlers/task.handler';

/**
 * @module Routes/Task route
 */
const router = express.Router();

router.get('/task', getAll);
router.get('/task/:id', getById);
router.post('/task', add);
router.put('/task/:id', update);


export default router;
