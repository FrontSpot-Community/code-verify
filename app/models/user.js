import mongoose from 'mongoose';
import {
    findAndCount,
    findOneOrCreate
} from '../libs/helper';
const Schema = mongoose.Schema;

const stringAndTrimType = {
    type: String,
    trim: true
};

const userSchema = new Schema({
    githubLogin: stringAndTrimType,
    githubUsername: stringAndTrimType,
    githubDisplayName: stringAndTrimType,
    githubId: stringAndTrimType,
    githubProfileUrl: stringAndTrimType,
    gitHubAvatar_url: stringAndTrimType
});

userSchema.statics.findAndCount = findAndCount;
userSchema.statics.findOneOrCreate = findOneOrCreate;

const userModel = mongoose.model('User', userSchema);
export default userModel;
