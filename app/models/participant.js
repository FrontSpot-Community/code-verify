import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {findAndCount} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tournamentId: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    statistics: {
        participated: Number,
        finished: Number,
        wins: Number
    }
});

const participantModel = createModel(
    'Participant',
    ParticipantSchema,
    findAndCount
);

export default participantModel;
