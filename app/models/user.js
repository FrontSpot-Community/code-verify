import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {
    findAndCount,
    findOneOrCreate,
    findAndIncrementField
} from '../libs/mongooseExtensionMethods';

const Schema = mongoose.Schema;

const taskScore = new Schema({
    name: stringAndTrimType,
    language: stringAndTrimType,
    status: stringAndTrimType,
    complexity: stringAndTrimType,
    contentmentQuantity: {type: Number, default: 0},
    resolvedQuantity: {type: Number, default: 0},
    taskStatus: stringAndTrimType
});

const scoreSchema = new Schema({
    tournaments: {
        participated: {type: Number, default: 0},
        finished: {type: Number, default: 0},
        wins: {type: Number, default: 0}
    },
    tasks: [taskScore],
    total: {
        solved: {type: Number, default: 0},
        trained: {type: Number, default: 0},
        attempts: {type: Number, default: 0}
    },
    totalScore: {type: Number, default: 0}
});

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
    totalScore: scoreSchema
});

const userModel = createModel(
    'User',
    userSchema,
    findAndCount,
    findOneOrCreate,
    findAndIncrementField
);

export default userModel;
