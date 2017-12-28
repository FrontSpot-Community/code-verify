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
  test: stringAndTrimType,
  stars: {type: Number},
  satisfaction: stringAndTrimType,
  solvedBy: stringAndTrimType,
  status: stringAndTrimType

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
