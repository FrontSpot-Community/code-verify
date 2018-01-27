import Task from '../../models/task';
import {createError} from '../../libs/common';

export default class TaskService {
  async getTaskById(taskId) {
    const query = {
      id: taskId
    };
    const data = await Task.findOne(query);
    if (!data) return Promise.reject(createError('Not Found', 404));

    return data;
  }

  async getTasksByIdS(taskIds) {
    const query = {
      id: taskIds
    };
    const data = await Task.find(query);
    if (!data) return Promise.reject(createError('Not Found', 404));

    return data;
  }
}
