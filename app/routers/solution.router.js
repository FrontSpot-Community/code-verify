import express from 'express';
import {getAll, getById, add, update} from '../handlers/solution.handler';

/**
 * @module Routes/Solution route
 */
const router = express.Router();

router.get('/solution', getAll);
router.get('/solution/:id', getById);
router.post('/solution', add);
router.put('/solution/:id', update);


export default router;
