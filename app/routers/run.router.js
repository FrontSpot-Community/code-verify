import express from 'express';
import {sendTask} from '../handlers/run.handler';
import addTasks from '../mocks';

/**
 * @module Routes/Solution route
 */
const router = express.Router();

router.post('/run', sendTask);
router.get('/run', (res, req) => {
  addTasks();

  res.send(200);
});


export default router;
