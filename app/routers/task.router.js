import express from 'express';
import checkAccess from '../middlewares/checkAccess';
import {
    getAll,
    getById,
    add,
    remove,
    update
} from '../handlers/task.handler';

/**
 * @module Routes/Task route
 */
const router = express.Router();

router.get('/task', getAll);
router.get('/task/:id', getById);
router.delete('/task/:id', remove);
router.post('/task', checkAccess, add);
router.put('/task/:id', checkAccess, update);


export default router;
