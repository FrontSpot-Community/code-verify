import Solution from '../models/solution';
import * as commonCrudOperations from '../libs/commonCrudOperations';

export const getAll = commonCrudOperations.getAll(Solution);

export const getById = commonCrudOperations.getById(Solution);

export const add = commonCrudOperations.add(Solution);

export const update = commonCrudOperations.update(Solution);
