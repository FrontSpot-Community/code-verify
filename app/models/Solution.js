import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    userId: Schema.Types.ObjectId,
    taskId: Schema.Types.ObjectId,
    answer: stringAndTrimType,
    datetime: {
        type: Date
    },
    score: {
        type: Number
    }
});

const taskModel = createModel(
    'Solution',
    SolutionSchema,
    findAndCount
);

export default taskModel;
