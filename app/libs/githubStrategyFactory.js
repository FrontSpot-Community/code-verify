import config from '../configuration';
import {Strategy as GitHubStrategy} from 'passport-github';
import UserModel from '../models/user';

const createInstanceGitHubStrategy = ()=> {
    const options = config.get('github');
    const callback = (accessToken, refreshToken, profile, cb) => {
        return UserModel
            .findOneOrCreate({githubId: profile.id}, profile)
            .then((data) => cb(null, data))
            .catch((err) => cb(err) );
    };
    return new GitHubStrategy(options, callback);
};

export default createInstanceGitHubStrategy;
