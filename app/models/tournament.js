import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    name: stringAndTrimType,
    description: stringAndTrimType,
    tags: [stringAndTrimType],
    difficulty: stringAndTrimType,
    language: stringAndTrimType,
    department: stringAndTrimType,
    status: stringAndTrimType,
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    taskIds: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }]
    }
});

const taskModel = createModel(
    'Tournament',
    tournamentSchema,
    findAndCount
);

export default taskModel;
