import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {findAndCount, findOneOrThrow} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    id: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        lowercase: true
    },
    name: {...stringAndTrimType, required: true},
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

tournamentSchema.pre('save', function(next) {
    const id = this.name.split(' ').join('_');
    this.id = id;
    next();
  });

const taskModel = createModel(
    'Tournament',
    tournamentSchema,
    findAndCount,
    findOneOrThrow
);

export default taskModel;
