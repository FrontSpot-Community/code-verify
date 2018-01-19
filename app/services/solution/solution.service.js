import Solution from '../../models/solution';
import Task from '../../models/task';

export default class SolutionService {
  constructor(runner) {
    this.runner = runner;
  }

  saveSolutionRun({userId, taskId, solutionCode, result, Model}) {
    if (!(userId && taskId && solutionCode && result)) {
      return Promise.reject('required field is not specified');
    }

    const {
      executionError,
      output,
      json,
      statistics,
      status
    } = result;

    const data = {
      userId,
      taskId,
      solution: solutionCode,
      runOutput: output,
      datetime: new Date(),
      statistics,
      status,
      executionError,
      jsonResult: JSON.stringify(json)
    };


    return new Model(data)
      .save();
  }

  async submitSolution(taskId, solutionCode, user) {
    const task = await Task.findOne({id: taskId});
    const runData = {
      language: task.language,
      code: solutionCode,
      tests: task.test
    };
    const result = await this.runner.sendTask(runData);
    return await this.saveSolutionRun({
      userId: user._id,
      taskId: task._id,
      solutionCode,
      result,
      Model: Solution
    });
}
}
