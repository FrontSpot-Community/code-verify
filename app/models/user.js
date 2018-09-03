import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {
    findAndCount,
    findOneOrCreate,
    findAndIncrementField
} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    githubLogin: stringAndTrimType,
    githubUsername: stringAndTrimType,
    githubDisplayName: stringAndTrimType,
    githubId: stringAndTrimType,
    githubProfileUrl: stringAndTrimType,
    gitHubAvatar_url: stringAndTrimType,
    firstName: stringAndTrimType,
    lastName: stringAndTrimType,
    email: stringAndTrimType,
    phoneNumber: stringAndTrimType,
    country: stringAndTrimType,
    upsa: stringAndTrimType,
    epamEmployee: Boolean,
    score: {type: Number, default: 0}, // deprecated field
    statistics: {
        tasks: {
            solved: {type: Number, default: 0}, // done
            trained: {type: Number, default: 0},
            attempts: {type: Number, default: 0} // done
        },
        totalScore: {type: Number, default: 0}
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const userModel = createModel(
    'User',
    userSchema,
    findAndCount,
    findOneOrCreate,
    findAndIncrementField
);

export default userModel;
