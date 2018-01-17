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

  solutionService.submitSolution(taskId, solutionCode, user)
    .then((data) => res.json(data))
    .catch(next);
}
