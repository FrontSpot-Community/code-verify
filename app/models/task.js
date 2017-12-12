import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;


const taskSchema = new Schema({
    name: stringAndTrimType,
    description: stringAndTrimType,
    language: stringAndTrimType,
    tests: {
        type: [stringAndTrimType]
    },
    test: stringAndTrimType
});

const taskModel = createModel(
    'Task',
    taskSchema,
    findAndCount
);

export default taskModel;
