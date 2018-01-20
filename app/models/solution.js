import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    runOutput: stringAndTrimType,
    solutionCode: stringAndTrimType,
    jsonResult: stringAndTrimType,
    datetime: {
        type: Date
    },
    statistics: {
        describe: Number,
        test: Number,
        passed: Number,
        failed: Number,
        error: Number,
        time: Number
    },
    availableTries: Number,
    tries: Number,
    completed: {
        type: Boolean,
        default: false
    },
    status: {
        type: stringAndTrimType
    },
    executionError: stringAndTrimType
});

const taskModel = createModel(
    'Solution',
    SolutionSchema,
    findAndCount
);

export default taskModel;
