import express from 'express';
import config from '../configuration';
import {successAuthenticateGithub} from '../handlers/auth.handler';
import {passportAuthMiddlware} from '../middlewares/passport.middleware';
/**
 * @module Routes/Auth route
 */
const router = express.Router();

const failureRedirect = config.get('github:login:failure_redirect');

router.get('/auth/github', passportAuthMiddlware());
router.get('/auth/github/callback',
  passportAuthMiddlware({failureRedirect}),
  successAuthenticateGithub
);


export default router;
