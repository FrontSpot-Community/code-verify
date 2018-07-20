import express from 'express';
import {
    getAll,
    getById,
    add,
    remove,
    update
} from '../handlers/tournament.handler';
import checkAccess from '../middlewares/checkAccess';
/**
 * @module Routes/Tournament route
 */
const router = express.Router();

router.get('/tournament', getAll);
router.get('/tournament/:id', getById);
router.post('/tournament', checkAccess, add);
router.put('/tournament/:id', checkAccess, update);
router.delete('/tournament/:id', remove);


export default router;
