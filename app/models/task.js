import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;


const taskSchema = new Schema({
    name: stringAndTrimType,
    description: stringAndTrimType,
    tests: {
        type: [stringAndTrimType]
    }
});

const taskModel = createModel(
    'Task',
    taskSchema,
    findAndCount
);

export default taskModel;
