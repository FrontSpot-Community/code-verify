import Task from '../models/task';
import * as commonCrudOperations from '../libs/commonCrudOperations';

export const getAll = commonCrudOperations.getAll(Task, {}, '-test');

export const getById = (req, res, next) => {
  return commonCrudOperations.getById(
    Task,
    'id',
    !req.user.isAdmin && '-test'
  )(req, res, next);
};

export const add = commonCrudOperations.add(Task);

export const remove = commonCrudOperations.removeById(Task, 'id');

export const update = commonCrudOperations.update(Task);
