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
      .exec();

    if (!tournament) return Promise.reject(createError('Not Found', 404));

    const taskIds = tournament.taskIds.map((task) => task._id);

    const solutions = await this.solutionService.getByTaskIds(taskIds, userId);

    const tasks = tournament.taskIds.map((task) => {
      const taskSolution = solutions.find((item) => {
        return String(item.taskId) === String(task._id);
      });

      task.status = taskSolution
        ? this.getCompletedStatus(taskSolution.completed)
        : task.status;

      return task;
    });

    tournament[taskIds] = tasks;
    return tournament;
  }
}
