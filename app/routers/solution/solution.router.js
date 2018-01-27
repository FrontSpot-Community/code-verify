import express from 'express';

import validator from '../../middlewares/validator';
import {
  getByTaskId,
  getByTaskIds,
  sendTask
} from '../../handlers/solution.handler';
import {
  solutionQuerySchema,
  solutionIdSchema,
  solutionSubmitScheme
} from './solution.validation';

/**
 * @module Routes/Solution route
 */
const router = express.Router();

router.get('/solution', validator(solutionQuerySchema), getByTaskIds);
router.get('/solution/:id', validator(solutionIdSchema), getByTaskId);
router.post('/solution', validator(solutionSubmitScheme), sendTask);


export default router;
