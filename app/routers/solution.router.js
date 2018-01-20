import express from 'express';
import {getAll, getByTaskId, sendTask} from '../handlers/solution.handler';

/**
 * @module Routes/Solution route
 */
const router = express.Router();

router.get('/solution', getAll);
router.get('/solution/:id', getByTaskId);
router.post('/solution', sendTask);


export default router;
