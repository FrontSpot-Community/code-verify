import express from 'express';
import {sendToSheet} from '../handlers/sec.handler';

/**
 * @module Routes/Task route
 */
const router = express.Router();

router.post('/sec', sendToSheet);

export default router;
