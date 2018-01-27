import * as commonCrudOperations from '../libs/commonCrudOperations';
import Solution from '../models/solution';
import SolutionService from '../services/solution';
import TaskService from '../services/task';
import RunnerService from '../services/runner';

const solutionService = new SolutionService(new RunnerService);
const taskService = new TaskService();

export const getAll = commonCrudOperations.getAll(Solution);
export const getById = commonCrudOperations.getById(Solution);

export function sendTask(req, res, next) {
  const {user} = req;
  const {solutionCode, taskId} = req.body;

  solutionService.submitSolution(taskId, solutionCode, user._id)
    .then((data) => res.json(data))
    .catch(next);
}

export function getByTaskId(req, res, next) {
  const {user} = req;

  const taskId = req.params.id;
  getSolutionByTaskId(taskId, user._id)
    .then((data) => res.json(data))
    .catch(next);
}

export function getByTaskIds(req, res, next) {
  const {user} = req;

  const taskIds = req.query.taskIds;
  const tasks = taskIds && taskIds.split(',') || [];
  getSolutionByTaskIds(tasks, user._id)
    .then((data) => res.json(data))
    .catch(next);
}

async function getSolutionByTaskId(taskId, userId) {
  const task = await taskService.getTaskById(taskId);

  return solutionService
    .getByTaskId(task._id, userId);
}

async function getSolutionByTaskIds(taskIds, userId) {
  const tasks = await taskService.getTasksByIdS(taskIds);
  const ids = tasks.map((task) => task._id);
  return solutionService
    .getByTaskId(ids, userId);
}
