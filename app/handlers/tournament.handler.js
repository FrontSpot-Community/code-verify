import Tournament from '../models/tournament';
import * as commonCrudOperations from '../libs/commonCrudOperations';

export const getAll = commonCrudOperations.getAll(Tournament);

export const getById = commonCrudOperations.getById(Tournament);

export const add = commonCrudOperations.add(Tournament);

export const update = commonCrudOperations.update(Tournament);
