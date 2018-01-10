import mongoose from 'mongoose';
import {createModel} from '../libs/mongoose';
import {stringAndTrimType} from '../libs/mongoosePropertyTypes';
import {
    findAndCount,
    findOneOrCreate
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
    country: stringAndTrimType
});

const userModel = createModel(
    'User',
    userSchema,
    findAndCount,
    findOneOrCreate
);

export default userModel;
