import Solution from '../../models/solution';
import Task from '../../models/task';
import {createError} from '../../libs/common';
import pick from '../../libs/pick';

export default class SolutionService {
  constructor(runner) {
    this.runner = runner;

    this.reponseFields = [
      'taskId',
      'completed',
      'executionError',
      'jsonResult',
      'runOutput',
      'solutionCode',
      'statistics',
      'status'
    ];
  }

  cleanResponce(data) {
    return pick(data, this.reponseFields);
  }

  async saveSolutionRun({userId, taskId, task, solutionCode, result, Model}) {
    if (!(userId && taskId && task && solutionCode && result)) {
      return Promise.reject('required field is not specified');
    }

    const {
      executionError,
      output,
      json,
      statistics,
      status
    } = result;

    const completed = this.isTaskFinished(task, statistics);

    const data = {
      userId,
      taskId,
      solutionCode,
      runOutput: output,
      datetime: new Date(),
      statistics,
      status,
      completed,
      executionError,
      jsonResult: JSON.stringify(json)
    };

    const condition = {userId, taskId};
    const options = {new: true, upsert: true};
    const updatedData = await Solution
      .findOneAndUpdate(condition, data, options);

    return this.cleanResponce(updatedData);
  }

  isTaskFinished(task, statistics) {
    const {numberOfTests} = task || {};
    const {passed} = statistics || {};

    return numberOfTests && passed
      && numberOfTests > 0 && numberOfTests <= passed;
  }

  async submitSolution(taskId, solutionCode, userId) {
    const task = await Task.findOne({id: taskId});
    if (!task) return Promise.reject({status: 404, message: 'Not Found'});

    const runData = {
      language: task.language,
      code: solutionCode,
      tests: task.test
    };
    const result = await this.runner.sendTask(runData);
    return await this.saveSolutionRun({
      userId: userId,
      taskId: task._id,
      solutionCode,
      result,
      task,
      Model: Solution
    });
  }

  async getByTaskId(taskId, userId) {
    const query = {
      taskId,
      userId
    };
    const data = await Solution.findOne(query);
    if (!data) return Promise.reject(createError('Not Found', 404));

    return this.cleanResponce(data);
  }

  async getByTaskIds(taskIds, userId) {
    const query = {
      taskId: taskIds,
      userId
    };

    const data = await Solution.find(query);
    if (!data) return Promise.reject(createError('Not Found', 404));

    if (Array.isArray(data)) {
      return data.map((item) => this.cleanResponce(item));
    }
    return this.cleanResponce(data);
  }
}
