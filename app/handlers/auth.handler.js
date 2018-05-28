import config from '../configuration';
import {signToken} from '../libs/jwt';

const successRedirect = config.get('github:login:success_redirect');

export const successAuthenticateGithub = (req, res, next) => {
    res.cookie('token', signToken(req.user));
    return res.redirect(successRedirect);
};


