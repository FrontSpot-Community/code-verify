import Solution from '../models/solution';
import * as commonCrudOperations from '../libs/commonCrudOperations';
import RunnerService from '../services/runner';
import Task from '../models/task';
import SolutionService from '../services/solution';

const runner = new RunnerService();

export const getAll = commonCrudOperations.getAll(Solution);

export const getById = commonCrudOperations.getById(Solution);

export function sendTask(req, res, next) {
  // const {user} = req;
  // if (!user) return next('Not logged in');

  const user = {_id: '5a3ff1887b47d900a865a9df'};

  const {solutionCode, taskId} = req.body;

  if (!(solutionCode && taskId)) return next();

  Task.findOne({_id: taskId})
      .then((task) => {
        const runData = {
          language: task.language,
          code: solutionCode,
          tests: task.test
        };
        return runner.sendTask(runData);
      })
      .then((result) => {
        return SolutionService.saveSolutionRun({
          userId: user._id,
          taskId,
          solutionCode,
          result,
          Model: Solution
        });
      })
      .then((data) => res.json(data))
      .catch(next);
}
