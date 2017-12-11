import RunnerService from '../services/runner';
import Task from '../models/task';

const runner = new RunnerService();

export function sendTask(req, res, next) {
  const {solution, taskName} = req.body;

  if (!(solution && taskName)) return next();

  const request = {};
  request.code = solution;

  Task.findOne({name: taskName})
      .then((data) => res.json(data))
      .then((json) => {
        console.log(json);
        res.send(json);
      })
      .catch(next);
}
