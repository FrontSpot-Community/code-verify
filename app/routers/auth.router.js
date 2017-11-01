import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    (req, res) => res.redirect('/')
);


export default router;
