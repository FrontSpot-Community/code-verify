import express from 'express';
import passport from 'passport';
import config from '../configuration';

/**
 * @module Routes/Auth route
 */


const router = express.Router();

const successRedirect = config.get('github:login:success_redirect');
const failureRedirect = config.get('github:login:failure_redirect');

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect}),
    (req, res) => res.redirect(successRedirect)
);


export default router;
