import Tournament from '../models/tournament';
import {pick} from 'lodash';

export const getAll = (req, res, next) => {
    return Tournament
        .findAndCount()
        .then((data) => res.json(data))
        .catch(next);
};

export const getById = (req, res, next) => {
    return Tournament
        .findOne({_id: req.params.id})
        .then((data) => res.json(data))
        .catch(next);
};

export const add = (req, res, next) => {
    const tournament = pick(req.body, Object.keys(req.body));
    return new Tournament(tournament)
        .save()
        .then((data) => res.json(data))
        .catch(next);
};

export const update = (req, res) => {
  res.json('update');
};
