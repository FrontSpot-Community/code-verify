import Task from '../models/task';
import * as commonCrudOperations from '../libs/commonCrudOperations';

export const getAll = commonCrudOperations.getAll(Task);

export const getById = commonCrudOperations.getById(Task, 'id');

export const add = commonCrudOperations.add(Task);

export const update = commonCrudOperations.update(Task);
