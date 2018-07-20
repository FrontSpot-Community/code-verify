import User from '../models/user';
import * as commonCrudOperations from '../libs/commonCrudOperations';

export const getAll = commonCrudOperations.getAll(
  User,
  {},
  null,
  {score: -1}
);

export const getById = commonCrudOperations.getById(User);

export const getUser = commonCrudOperations.getById(User);

export const removeUser = commonCrudOperations.removeById(User, 'id');

export const editUser = commonCrudOperations.update(User);
