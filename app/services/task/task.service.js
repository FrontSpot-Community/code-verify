import Task from '../../models/task';

export default class TaskService {
  async getTaskById(taskId) {
    const query = {
      id: taskId
    };
    const data = await Task.findOne(query);
    if (!data) return Promise.reject({status: 404, message: 'Not Found'});

    return data;
  }
}
