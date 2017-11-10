import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    userId: Schema.Types.ObjectId,
    taskId: Schema.Types.ObjectId,
    answer: stringAndTrimType,
    runOutput: stringAndTrimType,
    solutionText: stringAndTrimType,
    datetime: {
        type: Date
    },
    score: {
        type: Number
    },
    isDone: {
        type: Boolean,
        default: false
    }
});

const taskModel = createModel(
    'Solution',
    SolutionSchema,
    findAndCount
);

export default taskModel;
