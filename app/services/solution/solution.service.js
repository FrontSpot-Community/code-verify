export default {
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
};
