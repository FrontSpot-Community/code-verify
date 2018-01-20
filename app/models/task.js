import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  id: stringAndTrimType,
  name: stringAndTrimType,
  description: stringAndTrimType,
  language: stringAndTrimType,
  numberOfTests: Number,
  sample: stringAndTrimType,
  test: stringAndTrimType,
  stars: {type: Number},
  satisfaction: stringAndTrimType,
  solvedBy: stringAndTrimType,
  status: stringAndTrimType,
  complexity: stringAndTrimType,
  contentmentPercent: {type: Number},
  contentmentQuantity: {type: Number},
  resolvedSuccessfully: {type: Number},
  resolvedQuantity: {type: Number},
  authorName: stringAndTrimType,
  taskStatus: stringAndTrimType
});

taskSchema.pre('save', function(next) {
  const id = this.name.split(' ').join('_');
  this.id = id;
  next();
});

const taskModel = createModel(
    'Task',
    taskSchema,
    findAndCount,
);

export default taskModel;
