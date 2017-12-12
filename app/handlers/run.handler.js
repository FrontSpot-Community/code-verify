import RunnerService from '../services/runner';
import Task from '../models/task';

const runner = new RunnerService();

export function sendTask(req, res, next) {
  const {solution, taskName} = req.body;

  if (!(solution && taskName)) return next();

  const request = {};
  request.code = solution;

  Task.findOne({name: taskName})
      .then((task) => {
        const runData = {
          language: task.language,
          code: solution,
          tests: task.test
        };
        return runner.sendTask(runData);
      })
      .then((result) => {
        res.send(result);
      })
      .catch(next);
}
