import express from 'express';
import {getAll, getById, add, update} from '../handlers/tournament.handler';

/**
 * @module Routes/Tournament route
 */
const router = express.Router();

router.get('/tournament', getAll);
router.get('/tournament/:id', getById);
router.post('/tournament', add);
router.put('/tournament/:id', update);


export default router;
