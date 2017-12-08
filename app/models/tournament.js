import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount} from '../libs/mongooseExtensionMethods';
import {removeDupblicateValuesFromArray} from '../libs/common';

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    name: stringAndTrimType,
    description: stringAndTrimType,
    department: stringAndTrimType,
    tags: [stringAndTrimType],
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

const preSaveMiddleware = function(next) {
    const document = this;
    document.tags = removeDupblicateValuesFromArray(document.tags);
    next();
};

tournamentSchema.pre('save', preSaveMiddleware);

const taskModel = createModel(
    'Tournament',
    tournamentSchema,
    findAndCount
);

export default taskModel;
