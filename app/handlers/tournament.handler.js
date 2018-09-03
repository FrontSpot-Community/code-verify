import Tournament from '../models/tournament';
import * as commonCrudOperations from '../libs/commonCrudOperations';
import SolutionService from '../services/solution';
import TournamentService from '../services/tournament';

const solutionService = new SolutionService();
const tournamentService = new TournamentService(solutionService);

export const getAll = function(req, res, next) {
  const {user} = req;
  tournamentService.getTournamets(user._id)
    .then((data) => res.json(data))
    .catch(next);
};

export const getById = function(req, res, next) {
  const {user} = req;
  tournamentService.getTournamentById(req.params.id, user._id)
    .then((data) => res.json(data))
    .catch(next);
};

export const add = commonCrudOperations.add(Tournament);

export const remove = commonCrudOperations.removeById(Tournament, 'id');

export const update = commonCrudOperations.update(Tournament);
