import Tournament from '../../models/tournament';
import {createError} from '../../libs/common';

export default class TournamentService {
  constructor(solutionService) {
    this.solutionService = solutionService;
  }

  getCompletedStatus(completed) {
    return completed ? 'Completed' : 'In progress';
  }

  async getTournamentById(tournamentId, userId) {
    const query = {
      id: tournamentId
    };

    const tournament = await Tournament
      .findOne(query)
      .populate('taskIds')
      .lean()
      .exec();

    if (!tournament) return Promise.reject(createError('Not Found', 404));

    const taskIds = tournament.taskIds.map((task) => task._id);

    const solutions = await this.solutionService.getByTaskIds(taskIds, userId);

    let solved = 0;
    const tasks = tournament.taskIds.map((task) => {
      const taskSolution = solutions.find((item) => {
        return String(item.taskId) === String(task._id);
      });

      const status = taskSolution
        ? this.getCompletedStatus(taskSolution.completed)
        : task.status;

      if (taskSolution && taskSolution.completed) solved++;

      return {
        ...task,
        status
      };
    });

    return {
      ...tournament,
      taskIds: tasks,
      total: taskIds.length,
      solved: solved
    };
  }
}
