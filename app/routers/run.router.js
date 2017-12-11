import express from 'express';
import {sendTask} from '../handlers/run.handler';

/**
 * @module Routes/Solution route
 */
const router = express.Router();

console.log(sendTask);

router.post('/run', sendTask);


export default router;
