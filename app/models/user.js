import mongoose from 'mongoose';
import {
    findAndCount,
    findOneOrCreate
} from '../libs/helper';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    githubLogin: {
        type: String,
        trim: true
    },
    githubUsername: {
        type: String,
        trim: true
    },
    githubDisplayName: {
        type: String,
        trim: true
    },
    githubId: {
        type: String,
        trim: true
    },
    githubProfileUrl: {
        type: String,
        trim: true
    },
    gitHubAvatar_url: {
        type: String,
        trim: true
    }
});

userSchema.statics.findAndCount = findAndCount;
userSchema.statics.findOneOrCreate = findOneOrCreate;

const userModel = mongoose.model('User', userSchema);
export default userModel;
