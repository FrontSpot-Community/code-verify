import * as commonCrudOperations from '../libs/commonCrudOperations';
import Solution from '../models/solution';
import SolutionService from '../services/solution';
import RunnerService from '../services/runner';

const solutionService = new SolutionService(new RunnerService);

export const getAll = commonCrudOperations.getAll(Solution);
export const getById = commonCrudOperations.getById(Solution);

export function sendTask(req, res, next) {
  // TODO: add joy
  const {user} = req;
  if (!user) return next('User missed');
  // TODO: add joy
  const {solutionCode, taskId} = req.body;

  if (!(solutionCode && taskId)) return next();

  solutionService.submitSolution(taskId, solutionCode, user._id)
    .then((data) => res.json(data))
    .catch(next);
}

export function getByTaskId(req, res, next) {
  const {user} = req;
  if (!user) return next('User missed');
  const {taskId} = req.body;
  solutionService
    .getByTaskId(taskId, user._id)
    .then((data) => res.json(data))
    .catch(next);
}
