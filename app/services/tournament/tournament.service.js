import Tournament from '../../models/tournament';
import {createError} from '../../libs/common';
import isPast from 'date-fns/is_past';
import isFuture from 'date-fns/is_future';

const STATUS = {
  PREPARING: 'Preparing',
  STARTED: 'Started',
  FINISHED: 'Finished'
};

export default class TournamentService {
  constructor(solutionService) {
    this.solutionService = solutionService;
  }

  getCompletedStatus(completed) {
    return completed ? 'Completed' : 'In progress';
  }

  getTournamentStatistic(tournament, solutions) {
    let solved = 0;
    tournament.taskIds.forEach((taskId) => {
      const taskSolution = solutions.find((item) => {
        return String(item.taskId) === String(taskId);
      });
      if (taskSolution && taskSolution.completed) solved++;
    });

    return {
      solved,
      total: tournament.taskIds.length
    };
  }

  getStatus(tournament) {
    if (isPast(new Date(tournament.endDate))) return STATUS.FINISHED;
    if (isFuture(new Date(tournament.startDate))) return STATUS.PREPARING;

    return tournament.status;
  }

  async getTournamets(userId) {
    const response = await Tournament.findAndCount();

    const tournaments = response.data;

    const taskIds = tournaments.reduce((acc, tournament) => {
      return [...acc, ...tournament.taskIds];
    }, []);

    const solutions = await this.solutionService.getByTaskIds(taskIds, userId);
    const tournamentsResult = tournaments.map((tournament) => {
      const tasksResult = this.getTournamentStatistic(tournament, solutions);
      return {
        ...tournament,
        status: this.getStatus(tournament),
        ...tasksResult
      };
    });

    return {
      count: response.count,
      data: tournamentsResult
    };
  }

  async getTournamentById(tournamentId, userId) {
    const query = {
      id: tournamentId
    };

    const tournament = await Tournament
      .findOne(query)
      .populate({path: 'taskIds', select: '-test'})
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
